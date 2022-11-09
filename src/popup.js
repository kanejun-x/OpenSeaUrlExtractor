main();
async function main() {
  //アクティブなタブを取得
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //アクティブなタブでJavaScript(parseDOM)を実行
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: parseDOM,
    })
    .then(function (r) {
      //実行結果をポップアップウィンドウへ表示
      document.getElementById("image_url").innerHTML = r[0].result.imageSrc;
      document.getElementById("video_thumbnail").innerHTML =
        r[0].result.videoPoster;
      document.getElementById("video_url").innerHTML = r[0].result.videoSrc;
    });
}
function parseDOM() {
  const imageElems = document.getElementsByClassName("Image--image");
  const imageSrc = imageElems.length > 0 ? imageElems[0].src : "";
  const videoElems = document.getElementsByClassName("AssetMedia--video");
  const videoPoster =
    videoElems.length > 0 ? videoElems[0].attributes.poster.nodeValue : "";
  const videoSrc = videoElems.length > 0 ? videoElems[0].children[0].src : "";
  return { imageSrc: imageSrc, videoPoster: videoPoster, videoSrc: videoSrc };
}
