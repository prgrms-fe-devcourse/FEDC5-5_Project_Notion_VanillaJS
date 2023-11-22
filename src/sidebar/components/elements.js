export function ToggleElements({ id, isWrap }, depth) {
  return `
    <i class="toggle fas ${
      isWrap ? "fa-chevron-right" : "fa-chevron-down"
    }" data-id='${id}' data-isWrap='${isWrap}' style="padding-left: ${
    depth * 8
  }px;">
    </i>    
  `;
}

export function LiElements({ id, title }) {
  return `
    <span class='title' data-id='${id}' > 
      ${title} 
    </span>
  `;
}

export function AddElements({ id }) {
  return `
    <i class="fas fa-plus add" data-id='${id}' ></i>
  `;
}

export function removeElements({ id }) {
  return `
    <i class="fas fa-trash-alt remove" data-id='${id}' ></i>
  `;
}

export function NoPageElements({ depth }) {
  return `
    <span class='noPage' style="padding-left: ${depth * 2}px; cursor: default;">
      하위 페이지 없음
    </span>
  `;
}
