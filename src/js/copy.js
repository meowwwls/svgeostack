import ClipboardJS from 'clipboard';
import { statusEl, codeTxt, codeBtn } from './domcache';
import { setText } from './domhelpers';

const clipboard = new ClipboardJS('.js-copy');

clipboard.on('success', e => {
  setText(codeTxt, 'copied', 'copy code');
  setText(statusEl, 'SVG code copied');
  e.clearSelection();
});

clipboard.on('error', e => {
  setText(codeTxt, 'failed to copy', 'copy code');
  setText(statusEl, 'failed to copy SVG code');
});

if (!ClipboardJS.isSupported()) {
  codeBtn.setAttribute('hidden', 'true');
}

export default clipboard;
