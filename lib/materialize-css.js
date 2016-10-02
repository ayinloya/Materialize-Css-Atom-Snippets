'use babel';

import MaterializeCssView from './materialize-css-view';
import { CompositeDisposable } from 'atom';

export default {

  materializeCssView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.materializeCssView = new MaterializeCssView(state.materializeCssViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.materializeCssView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'materialize-css:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.materializeCssView.destroy();
  },

  serialize() {
    return {
      materializeCssViewState: this.materializeCssView.serialize()
    };
  },

  toggle() {
    console.log('MaterializeCss was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
