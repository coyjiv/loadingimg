"use strict";

class Image {
  constructor(loaderSrc, src, isLoading = true, id) {
    this.loaderSrc = loaderSrc;
    this.src = src;
    this.id = id;
    this.isLoading = isLoading;
  }
  async checkIsLoading() {
    do {
      const arr = [
        axios(
          "https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new"
        ),
        axios(
          "https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new"
        ),
      ];
      const res = await Promise.all(arr);
      const numbers = res.map((object) => object.data);
      this.isLoading = numbers.every((number) => number % 2 === 0);
      this.render();
    } while (this.isLoading === true);
  }
  render() {
    if (this.isLoading === true) {
      const check = document.getElementById(this.id);
      if (check === null) {
        const wrapper = document.querySelector("#img-wrapper");
        const loadingImg = document.createElement("img");
        loadingImg.setAttribute("src", this.loaderSrc);
        loadingImg.setAttribute("alt", "loading");
        loadingImg.setAttribute("id", this.id);
        wrapper.append(loadingImg);
      }
    } else {
      const contentImg = document.getElementById(`${this.id}`);
      if (contentImg === null) {
        const wrapper = document.querySelector("#img-wrapper");
        const img = document.createElement("img");
        img.setAttribute("src", this.src);
        img.setAttribute("alt", "content-image");
        img.setAttribute("id", this.id);
        wrapper.append(img);
        return;
      }
      contentImg.setAttribute("src", this.src);
      contentImg.setAttribute("alt", "content-image");
    }
  }
}
const createContent = async () => {
  const response = await axios("/img/content");
  response.data.map((filename, index) =>
    new Image(
      "./img/loading.gif",
      `./img/content/${filename}`,
      true,
      index
    ).checkIsLoading()
  );
};
createContent();
