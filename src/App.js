import MainPage from '@/pages/MainPage';
import { addPopstateEvent, addRouteChangeEvent } from '@/router';
import Component from '@/core/Component';

import './App.scss';

export default class App extends Component {
  setup() {
    this.$mainPage = new MainPage(this.$target);
    this.route();
  }

  setEvent() {
    addRouteChangeEvent(this.route.bind(this));
    addPopstateEvent(this.route.bind(this));
  }

  getDocumentId() {
    const { pathname } = window.location;
    const documentId = pathname.split('/').pop();

    return Number(documentId) || null;
  }

  route() {
    const documentId = this.getDocumentId();

    this.$mainPage.setState({ ...this.$mainPage.state, currentId: documentId });
  }
}
