import { Component, jsx } from "@seongbin9786/my-renderer";

import { createDropdownItems } from "./dropdownActionItems.js";

// TODO: 팝업은 focus가 팝업에 되는데, 드롭다운은 focus가 안 됨. 뭐지?
// 관찰: Caret은 Text에 그대로 있는데, 화살표 입력만 인터셉트해서 직접 움직이는 듯
// 이 때 focus를 쓰는 게 아니라(그럼 텍스트 입력을 못할테니) js로 이동만 하고, hover 같은 애니메이션
// 띄워서 마치 hover인 것처럼, focus인 것처럼 생각하게 하는 듯.
// 마우스로 드롭다운 클릭을 한 번 해버리면 텍스트 focus를 잃어서 더 이상 입력할 수 없게 됨.
export class Dropdown extends Component {
    // TODO: hover 후에도 나갔던 영역을 계속 하이라이팅해야 함.
    // 일단 당장은 hover로 떼우기
    // TODO: /page와 같이 명령어 방식으로도 처리할 수 있게 이벤트 핸들링하기
    // TODO: 아이템 핸들러가 드롭다운 자체를 조작 가능해야 하는데, 초기화 전에 전달할 방법이 없다.
    render() {
        const { documentId } = this.props;

        // $dropdown.style.display = "none";
        return jsx`
            <div 
                className=editor__dropdown
                style=${{ display: "none" }}
            >
                <div className=editor__dropdown__header>기본 블록</div>
                <div className=editor__dropdown__list autoFocus=true>
                    ${createDropdownItems(documentId).map(
                        ({ imageUrl, name, description, handler }) => jsx`
                        <div 
                            className=editor__dropdown__item
                            onclick=${handler}
                        >
                            <img 
                                className=editor__dropdown__item_thumbnail 
                                src=${imageUrl}
                            />
                            <div className=editor__dropdown__item_textbox>
                                <div className=editor__dropdown__item_title>${name}</div>
                                <div className=editor__dropdown__item_description>${description}</div>
                            </div>
                        </div>`,
                    )}
                </div>
            </div>
        `;
    }
}
