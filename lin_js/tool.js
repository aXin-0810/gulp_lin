// 动态加载js
export function loadScript(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (
          script.readyState == "loaded" ||
          script.readyState == "complete"
        ) {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else {
      //Others
      script.onload = function () {
        console.log("complete");
        resolve();
      };
      script.onerror = function (e) {
        reject(e);
      };
    }
    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
  });
};
