import firebase from "@/plugins/firebase";
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { Liver } from "../../../types/Liver";

class LiverCollectionState {
  // typeで指定する
  livers: Array<Liver> = [];
  isLoaded = false;
}

export class LiverCollectionGetters extends Getters<LiverCollectionState> {
  getLiver(channelId: string): Liver {
    return this.state.livers.find((liver: Liver) => liver.channelId === channelId)!
  }
  get isLoaded(): boolean {
    return this.state.isLoaded;
  }
}

export class LiverCollectionMutations extends Mutations<LiverCollectionState> {
  setLivers(payload: Array<Liver>) {
    this.state.livers = payload
  }
  isLoadLiver(payload: boolean) {
    this.state.isLoaded = payload
  }
}
export class LiverCollectionActions extends Actions<
  LiverCollectionState,
  LiverCollectionGetters,
  LiverCollectionMutations,
  LiverCollectionActions
  > {
  async loadLiver(): Promise<any> {
    const liverCollections = await firebase.firestore().collection("livers").get()
    this.commit("setLivers", liverCollections.docs.map(x => x.data() as Liver))
    this.commit("isLoadLiver", true)
  }
}

export const LiverCollectionModule = new Module({
  state: LiverCollectionState,
  getters: LiverCollectionGetters,
  mutations: LiverCollectionMutations,
  actions: LiverCollectionActions
})

export const liverCollectionMapper = createMapper(LiverCollectionModule);
