import Drop from 'tether-drop';
import _ from 'lodash';
import DOMAttachedObject from 'vj/components/DOMAttachedObject';

import timeagoFactory from 'timeago.js';
import i18n from 'vj/utils/i18n';

const timeago = timeagoFactory();
timeago.setLocale(i18n('timeago_locale'));

export default class Tooltip extends DOMAttachedObject {
  static DOMAttachKey = 'vjTooltipInstance';

  constructor($dom, options = {}) {
    super($dom, true);
    const tmpTime = $dom.get(0).cloneNode(false);
    timeago.render(tmpTime);
    this.dropRemoved = false;
    this.drop = new Drop({
      target: $dom[0],
      classes: 'tooltip',
      position: options.position || 'top center',
      openOn: 'hover',
      constrainToWindow: true,
      constrainToScrollParent: false,
      content: tmpTime.innerHTML,
    });
    this.isOpen = false;
    this.drop.on('open', this.onOpen, this);
    this.drop.on('close', this.onClose, this);
    this.delayDetach = _.debounce(this.detach.bind(this), 200);
  }

  onOpen() {
    this.delayDetach.cancel();
  }

  onClose() {
    this.delayDetach();
  }

  detach() {
    if (this.detached) {
      return;
    }
    super.detach();
    this.drop.destroy();
  }

  close() {
    this.drop.close();
  }

  open() {
    this.drop.open();
  }
}

_.assign(Tooltip, DOMAttachedObject);
