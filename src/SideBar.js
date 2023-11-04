import { pageAddDeleteButton } from "./PageButton.js";
import SideBarHeader from "./SideBarHeader.js";
import SideBarList from "./SideBarList.js";
import { request } from "./utils/api.js";
import { initPageAll, pageAll } from "./utils/pageAll.js";
import { searchTrie } from "./utils/trie.js";

export default function SideBar({ $target }) {
  new SideBarHeader({ $target });

  const sideBarList = new SideBarList({
    $target,
    initialState: [],
    handleChangeList: async () => await this.setState(),
  });

  new pageAddDeleteButton({
    $target,
    handleChangeList: async () => await this.setState(),
  }); //새페이지 버튼

  this.setState = async () => {
    const res = await request("/documents");
    sideBarList.setState(res);
    initPageAll(res);
    for (const page of pageAll) {
      const [id, title] = page;
      searchTrie.insert(id, title);
    }
  };
}
