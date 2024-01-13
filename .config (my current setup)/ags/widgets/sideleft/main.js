import PopupWindow from '../../lib/popupwindow.js';
import SidebarLeft from "./sideleft.js";

export default () => PopupWindow({
    focusable: true,
    anchor: ['left', 'top', 'bottom'],
    name: 'sideleft',
    // exclusivity: 'exclusive',
    showClassName: 'sideleft-show',
    hideClassName: 'sideleft-hide',
    child: SidebarLeft(),
});
