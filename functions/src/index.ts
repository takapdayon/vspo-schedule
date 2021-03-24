import functions = require('firebase-functions');
import admin = require('firebase-admin');
import { Liver } from "../../types/Liver";
import * as dayjs from "dayjs";

admin.initializeApp();
dayjs.locale('ja');

const { google } = require('googleapis');
const apiKey = functions.config().youtube.apikey;
const youtube = google.youtube({ version: 'v3', auth: apiKey })


// ライバーの情報を更新する
const updateLiverInfo = async (doc: any) => {
  let liverinfo: Liver = doc.data()
  const youtubeliverInfo = await youtube.channels.list({
    id: liverinfo.channelId,
    part: 'snippet'
  })
  const updateRef = admin.firestore().collection('livers').doc(doc.id)
  await updateRef.update({
    channelName: youtubeliverInfo.data.items[0].snippet.title,
    channelIcon: youtubeliverInfo.data.items[0].snippet.thumbnails.medium.url
  })
}

const updateSchedule = async (item: any) => {
  const scheduleRef = admin.firestore().collection('schedules').doc(item.id)
  if (item.liveStreamingDetails) {
    await scheduleRef.set({
      channelId: item.snippet.channelId,
      description: item.snippet.description,
      id: item.id,
      liveBroadcastContent: item.snippet.liveBroadcastContent,
      scheduledStartTime: admin.firestore.Timestamp.fromDate(new Date(item.liveStreamingDetails.scheduledStartTime)),
      thumbnails: item.snippet.thumbnails.standard.url,
      title: item.snippet.title,
    })
    .catch(e => {
      console.log(e)
      console.log(item)
    })
  }
}

const checkLiverSchedule = async (doc: any) => {
  const liverinfo: Liver = doc.data()
  const youtubescheduleInfo = await youtube.search.list({
    channelId: liverinfo.channelId,
    part: 'snippet',
    order: 'date',
    type: 'video',
    maxResults: 7,
  })
  const videos = youtubescheduleInfo.data.items.map((item: any) => item.id.videoId);
  const youtubeliverInfo = await youtube.videos.list({
    id: videos.join(','),
    part: 'snippet,liveStreamingDetails'
  })
  youtubeliverInfo.data.items.forEach(async (item: any) => await updateSchedule(item))
}

// 一昨日より前のスケジュールを削除
const deleteSchedule = async () => {
  const scheduleInfo = await admin.firestore().collection('schedules').get()
  scheduleInfo.docs.forEach(async (doc) => {
    const scheduleInfo = doc.data();
    if (dayjs(scheduleInfo.scheduledStartTime.toDate()).isBefore(dayjs().subtract(2, 'day'), 'days')) {
      await admin.firestore().collection('schedules').doc(scheduleInfo.id).delete()
    }
  })
}

/*
scheduleは3つまでしか無料じゃないから...しぶしぶ1つに全盛り...
*/
exports.updatesFunction = functions.region('asia-northeast1').pubsub.schedule('every 4 hours')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const liversInfo = await admin.firestore().collection('livers').get();
    await Promise.all(liversInfo.docs.map(async (doc) => await updateLiverInfo(doc))).catch(e => e);
    await Promise.all(liversInfo.docs.map(async (doc) => await checkLiverSchedule(doc))).catch(e => e);
    await deleteSchedule();
    return null;
  });
