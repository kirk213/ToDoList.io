
export function autoHeightTextarea(){
    // textareaタグを全て取得
    const textareaEls = document.querySelectorAll("textarea");

    
    textareaEls.forEach((textareaEl) => {
        // デフォルト値としてスタイル属性を付与
        textareaEl.setAttribute("style", `height: ${textareaEl.scrollHeight}px;`);
        // inputイベントが発生するたびに関数呼び出し
        textareaEl.addEventListener("input", setTextareaHeight);
        TextareaHeight(textareaEl);
    });
    
    // textareaがアクティブの時に高さを計算して指定する関数
    function setTextareaHeight() {
        this.style.height = "auto";
        this.style.height = `${this.scrollHeight}px`;
    }
    // textareaの高さを計算して指定する関数
    function TextareaHeight(textareaEl) {
        textareaEl.style.height = "auto";
        textareaEl.style.height = `${textareaEl.scrollHeight}px`;
    }
}