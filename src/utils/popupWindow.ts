export const popupCenter = (
  url: string,
  title: string,
  win: Window,
  w: number,
  h: number
) => {
  const winHeight = win.top ? win.top.outerHeight / 2 : null;
  const winWidth = win.top ? win.top.outerWidth / 2 : null;
  const screenY = win.top ? win.top.screenY - h / 2 : null;
  const screenX = win.top ? win.top.screenX - w / 2 : null;
  const y = winHeight && screenY ? winHeight + screenY : null;
  const x = winWidth && screenX ? winWidth + screenX : null;
  win.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${
      y as number
    }, left=${x as number}`
  );
};
