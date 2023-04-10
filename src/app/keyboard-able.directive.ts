import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Renderer2, ViewContainerRef } from '@angular/core';
import { KeyboardComponent } from './keyboard/keyboard.component';
import Keyboard from 'simple-keyboard';
import { SpatialNavService } from './spatial-nav.service';
import { KeyboardHandlerEvent } from 'simple-keyboard/build/interfaces';


@Directive({
  selector: '[KeyboardAble]'
})



export class KeyboardAbleDirective {
  constructor(private element: ElementRef,private spatial:SpatialNavService

  ) { }

  componentRef:any;
  host:any;
  holder:any;
  holderDiv:HTMLDivElement=<HTMLDivElement>(document.createElement('div'));
  keyboard:any
  keybordDiv:HTMLDivElement=<HTMLDivElement>(document.createElement('div'));
  ngOnInit() {
    Keyboard.prototype.handleKeyUp=function (event: KeyboardHandlerEvent): void {
      console.log(event);
      if(event.key==='Enter'){
     this.caretEventHandler(event);
      
        
      }
      //this.handleMouseUp(event);
    }
    this.element.nativeElement.parentNode.classList.add('position-relative');
    this.keybordDiv.classList.add('simple-keyboard-'+this.element.nativeElement.name);   
    this.holderDiv.classList.add('keyboardHolder');
    this.holderDiv.appendChild(this.keybordDiv);
    this.holder=this.element.nativeElement.parentNode.appendChild(this.holderDiv);
    console.log(this.element.nativeElement);
    this.keyboard = new Keyboard('.simple-keyboard-'+this.element.nativeElement.name,{
      onChange: (input: string)  => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),    
      useButtonTag :true,
      useMouseEvents: true,
      debug:true,  
      layout: {
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{shift} z x c v b n m {backspace}",
          "{numbers} @ . {space} {ent}"
        ],
        shift: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{shift} Z X C V B N M {backspace}",
          "{numbers} @ . {space} {ent}"
        ],
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
      },
      display: {
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{ent}": "↵",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{shiftright}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{numbers}" : "123",
        "{space}":" ",
        "{abc}":"ABC",
      }
    });
    
    setTimeout(()=>{
    (document as any).querySelectorAll('.hg-button').forEach((el:any) => {
      el.setAttribute('tabIndex','-1');
     
    });
    
    
  },100)
    
  }
  @HostListener("keydown", ["$event"]) showKeyboard(event: KeyboardEvent) {
    console.log(event);
    if(event.key=='Enter'){
      this.holderDiv.classList.add('active');
      //this.element.nativeElement.addEventListener('blur',this.hideKeyboard())  
      this.spatial.SN.add('keyboardKeys_'+this.element.nativeElement.name,{selector: '.simple-keyboard-'+this.element.nativeElement.name+' .hg-button', restrict: 'self-only',rememberSource:true});
      this.spatial.SN.focus('keyboardKeys_'+this.element.nativeElement.name);  
      console.log('focus');
      
    }
  } 

  destroyKeyboard() {
    this.keyboard.destroy();
    this.holderDiv=<HTMLDivElement>(document.createElement('div'));
    this.keybordDiv=<HTMLDivElement>(document.createElement('div'));
    this.holderDiv.remove();
    this.keybordDiv.remove();
  }

  onChange = (input: string) => {
    this.element.nativeElement.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    if(button === "{ent}"){
      this.holderDiv.classList.remove('active');
      console.log('hide');
      this.spatial.SN.remove('keyboardKeys_'+this.element.nativeElement.name);
      this.spatial.SN.focus(this.element.nativeElement)
    }
    if(button === "{numbers}" || button === "{abc}"){
      this.handleNumbers();
    }
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  handleNumbers = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "numbers" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }
  
} 