//Drag and drop
export function allowDrop(event: DragEvent) {
  event.preventDefault();
}
function moveAt(toy: HTMLElement, pageX: number, pageY: number) {
  toy.style.left = pageX - 32 + 'px';
  toy.style.top = pageY - 32 + 'px';
}

export function drag(toy: HTMLElement, event: DragEvent, targetId: string) {
  event.dataTransfer?.setData('text', targetId);
}

function dropClone(ToyNum: string) {
  let toyTemplate: HTMLTemplateElement | null = null;
  toyTemplate = document.querySelector('.selected-toy');
  let toyClone: HTMLTemplateElement | null = null;
  toyClone = toyTemplate?.cloneNode(true) as HTMLTemplateElement;
  toyClone.style.backgroundImage = `url('../../../assets/toys/${ToyNum}.png')`;
  toyClone.style.position = 'absolute';
  return toyClone;
}

export function drop(event: DragEvent) {
  event.preventDefault();
  const data = event.dataTransfer?.getData('text');
  const target = event.target as HTMLTextAreaElement;
  let element;
  if (data) {
    element = dropClone(data);
    moveAt(element, event.offsetX, event.offsetY);
  }
  if (element) target?.appendChild(element);
}

//GARLAND
let tempStyle = '';
export function lightsOn(style: string) {
  const garlandWrap = document.querySelector('.garland-container');
  const diods = garlandWrap?.querySelectorAll('.diod');
  const flashlights = garlandWrap?.querySelectorAll('.garland-line');

  if (tempStyle !== '' && diods) {
    if (tempStyle == style) {
      if (diods)
        Array.from(diods).forEach((diod) => {
          diod.classList.remove(style);
          tempStyle = '';
        });
      if (flashlights)
        Array.from(flashlights).forEach((flashlight) => {
          flashlight.classList.remove(style);
          tempStyle = '';
        });

      garlandWrap?.classList.add('hidden');
    } else {
      if (style == 'flashing' && flashlights) {
        console.log(flashlights);
        Array.from(flashlights).forEach((flashlight) => {
          flashlight.classList.remove(tempStyle);
        });
        Array.from(flashlights).forEach((flashlight) => {
          flashlight.classList.toggle(style);
          tempStyle = style;
        });
      } else {
        Array.from(diods).forEach((diod) => {
          diod.classList.remove(tempStyle);
        });
        Array.from(diods).forEach((diod) => {
          diod.classList.toggle(style);
          tempStyle = style;
        });
      }
    }
  } else {
    if (diods) {
      garlandWrap?.classList.toggle('hidden');

      if (style == 'flashing' && flashlights) {
        Array.from(flashlights).forEach((flashlight) => {
          flashlight.classList.toggle(style);
          tempStyle = style;
        });
      } else {
        Array.from(diods).forEach((diod) => {
          diod.classList.toggle(style);
          tempStyle = style;
        });
      }
    }
  }
}

//TODO fix saving
export function createCanvas(elementId: string) {
  // let img = document.getElementById(elementId);
  // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  // if (canvas !== null) {
  //   canvas.width = img?.clientWidth || 0;
  //   canvas.height = img?.clientHeight || 0;
  //   const context = canvas.getContext('2d');
  //   if (img !== null) context?.drawImage(img, 0, 0, img.width, img.height);
  // }
}
