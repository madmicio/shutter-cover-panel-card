import {
    LitElement,
    html,
    css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";
class ShutterCoverPanelcard extends LitElement {
  
  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  
  constructor() {
    super();
  }
  
  render() {
    var coverWidth = this.config.coverWidth ? this.config.coverWidth : "100px";
    var coverHeight = this.config.coverHeight ? this.config.coverHeight : "300px";
    var innershadow = this.config.innershadow == "enable" ? true : false;
    var iconemboss = this.config.iconemboss == "enable" ? true : false;
    var countText = this.config.countText ? this.config.countText : "aperte";
    var entityCounter = 0;
    var background = this.config.background ? this.config.background : "transparent";
    var sidebackground = this.config.sidebackground ? this.config.sidebackground : "#f6f5fa";
    var covercolor = this.config.covercolor ? this.config.covercolor : "#0080ff";
    var coverbackground = this.config.coverbackground ? this.config.coverbackground : "#f2f0fa";
    
    
    return html`
         <div class="page" style="background:${background};">
          
          
          <div class="main">
            <div class="inner-main" style="width:${this.config.entities.length * 150}px;">
            ${this.config.entities.map(ent => {
                entityCounter++;
                const stateObj = this.hass.states[ent.entity];
                return stateObj ? html`
                    <div class="cover">
                      <div class="cover-slider">
                        <h2>${ent.name || stateObj.attributes.friendly_name}</h2>
                            <h4 class="cover">${stateObj.state === "closed" ? 0 : Math.round(stateObj.attributes.current_position)}</h4>
                            <div class="range-holder" style="--slider-height: ${coverHeight}; --covercolor: ${covercolor}; --coverbackground: ${coverbackground};">
                              <input type="range" class="${stateObj.state}" style="--slider-width: ${coverWidth};--slider-height: ${coverHeight};" .value="${stateObj.state === "close" ? 0 : Math.round((stateObj.attributes.current_position -100) * -1)}" @change=${e => this._setCoverPosition(stateObj, (e.target.value -100) * -1)}>
                            </div>
                      </div>
                      <div class="push">
                      </div>
                      <div class="push" style="--coverbackground: ${coverbackground};">
                        <input type="checkbox" id='up${entityCounter}' class='push-btn' @click=${e => this._up(stateObj)} />
                        <label for='up${entityCounter}'>↑</label>
                      </div>
                      <div class="push" style="--coverbackground: ${coverbackground};">
                        <input type="checkbox" id='stop${entityCounter}' class='push-btn' @click=${e => this._stop(stateObj)} />
                        <label for='stop${entityCounter}'>◼︎</label>
                      </div>
                      <div class="push" style="--coverbackground: ${coverbackground};">
                        <input type="checkbox" id='down${entityCounter}' class='push-btn' @click=${e => this._down(stateObj)} />
                        <label for='down${entityCounter}'>↓</label>
                      </div>
                    </div>
                `: html``;
            })}
            </div>
          </div>
          <div class="side" style="background:${sidebackground};">
            <div class="header">
            </div>
            <div class="center">
              <h1>${this.config.title}</h1>
              <h3>${this._stateCount()} ${countText}</h3>
            </div>
          <div class="${innershadow ? 'card_shadow' : 'card_no_shadow'}" style="background:${background};">
            <div class="${innershadow ? 'inner-main' : 'inner-main_no_shadow'}">
            ${this.config.sidebuttons.map(ent => {
                 const sideBnt = this.hass.states[ent.entity];
                 return sideBnt ? html`
                    <div class="frame_1">
                              <div class="grid-container">
                              ${ent.cardtype == "button" ? html`
                                    <div class="${iconemboss? 'iconside icon_shadow click' : 'iconside click'}" 
                                                  style="${sideBnt.state =="on" ? 'background-color: var(--active-background-button-color);' : 'background-color: var(--deactive-background-button-color); border: solid 1px var(--button-border-standard);'}" @click=${e => this._switch(sideBnt)}>
                                        <ha-icon icon="${ent.icon  || sideBnt.attributes.icon}" 
                                                  style="color:${sideBnt.state =="on" ? 'var(--state-icon-secondary-color);' : 'var(state-icon-color);'}"/>
                                      </div>
                                      <div class="left_row text ">${ent.name || sideBnt.attributes.friendly_name} </div>  
                                      <div class="left_row label">${ent.label}</div> 
                                        </div>
                              ` : html`
                              `}
                              ${ent.cardtype == "script" ? html`
                                    <div class="${iconemboss? 'iconside icon_shadow click' : 'iconside click'}" style="background-color: var(--deactive-background-button-color); border: solid 1px var(--button-border-standard);" @click=${e => this._switch(sideBnt)}>
                                        <ha-icon icon="${ent.icon  || sideBnt.attributes.icon}" style="color: var(--state-icon-primary-color);"/>
                                      </div>
                                      <div class="left_row text ">${ent.name || sideBnt.attributes.friendly_name}</div>  
                                      <div class="left_row label">${ent.label}</div> 
                                        </div>
                              ` : html`
                              `}
                              
                `: html``;
              })}
        </div>
    `;
  }
    
  updated() {}
  
  _setCoverPosition(state, value) {
    this.hass.callService("cover", "set_cover_position", {
        entity_id: state.entity_id,
        position: value
    });
  }
  
  _stateCount() {
      let count = 0;
      this.config.entities.map(ent => {
          const stateObj = this.hass.states[ent.entity];
          if(stateObj.state === "open") {
              count++;
          }
      })
      return count;
  }

  
  _switch(state) {
    this.hass.callService("homeassistant", "toggle", {
      entity_id: state.entity_id     
    });
  }

  _up(state) {
    this.hass.callService("cover", "open_cover", {
      entity_id: state.entity_id    
    });
  }

  _stop(state) {
    this.hass.callService("cover", "stop_cover", {
      entity_id: state.entity_id    
    });
  }

  _down(state) {
    this.hass.callService("cover", "close_cover", {
      entity_id: state.entity_id    
    });
  }
  
  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    if (!config.title) {
      throw new Error("You need to define a title");
    }
    if (!config.icon) {
      throw new Error("You need to define a icon");
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`



    .frame_1 {
          
      display:inline-block;
      justify-self: stretch;
      border-radius:20px;
      height: 70px;
      width: 290px

    }

    .grid-container {
      display: grid;
      grid-template-columns: 55px auto;
      grid-template-rows: 50% 50%;
      grid-template-areas:
        'menu main'
        'menu footer';
      grid-gap: 1px;
      background-color: transparent;
      padding: 1px;
      
    }
    
    .grid-container > div {
      text-align: left;
      font-size: 14px;
    }

    .card_shadow {

      height:100%;
      width: 98%;

      border-radius:20px;
      display:flex;
      flex-direction: row;
     // justify-self: stretch;
      box-shadow: inset -6px -6px 6px 0 rgba(255,255,255,.5), inset 6px 6px 6px 0 rgba(0,0,0,.1); 
    }

    .card_no_shadow {
      height:100%;
      border-radius:20px;
      display:flex;
      flex-direction: row;
      justify-self: stretch;
      
    }

    .inner-main {
      width:100%;
      display:flex;
      flex-direction:column;
      justify-self: stretch;

      margin-left:15px;
      margin-top:10px;
      margin-right:15px;
      margin-bottom:10px;
    }

    .inner-main_no_shadow {
      width:100%;
      display:flex;
      flex-direction:column;
      justify-self: stretch;

      }
    
    .iconside {
      position: relative;

      border-radius:15px;
      display: block;
      padding-top:17px;
      grid-area: menu;
      margin: 0 auto;
      width:58px;
      height:42px;
      text-align: center;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      text-decoration: none;
      overflow: hidden;

      }
      .iconside:hover  {
        background-color: var(--active-background-button-color);
      }
      
      .iconside:after {
        content: "";
        background: #90EE90;
        display: block;
        position: absolute;
        padding-top: 300%;
        padding-left: 350%;
        margin-left: -20px!important;
        margin-top: -120%;
        opacity: 0;
        transition: all 0.8s
      }

      .iconside:active:after {
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s
      }

      .click {
        cursor: pointer;
      }

      .icon_shadow {
        box-shadow: -3px -3px 3px 0 rgba(255,255,255,.2),6px 6px 6px 0 rgba(0,0,0,.1);
        border: solid 1px rgba(255,255,255, .2)
        
      }

      .text {
        grid-area: main;
        color: var(--primary-text-color);
        display: block;
        padding-top:10px;
        font-size: 12px;
        font-weight: bold;
        font-family: Helvetica;
        letter-spacing: '-0.01em';
        
      }

      .label {
        grid-area: footer;
        color: var(--primary-text-color);
        display: block;
        font-size: 8px;
        font-family: Helvetica;
        letter-spacing: '-0.01em';
      }

      .left_row {
        margin-left:15px;
        margin-right:15px;
      }

      ha-icon {

        width:26px;
        height:26px;
        display: block;

        margin-left: auto;
        margin-right: auto;
        
      }


        :host {
            
        }
        .page {
          width:100%;
          height:100%;
          display:flex;
          flex-direction: row;
        }
        .page > .side {
          padding: 15px;
          width: 300px;
          display:flex;
          flex-direction:column;
          background: transparent; 
          align-items:flex-end;
//          background: linear-gradient(235deg, rgba(28,122,226,1) 0%, rgba(66,230,222,1) 90%);
//          justify-content:space-between
        }
        .side .header {
          
        }

        .side .center {
          display:flex;
          flex-direction:column;
          
        }
        .side .center .icon {
          display:block;
          overflow:hidden;
        }
        .side .center .icon ha-icon {
          width: 80px;
          height: 80px;
          color: var(--state-icon-active-color);
        }
        .side .center  h1 {
          color: var(--primary-text-color);
          width: 290px;
          margin:20px 0 0 0;
          font-weight:400;
          font-size: 35px;
          line-height: 40px;
        }
        .side .center  h3 {
          color: var(--primary-text-color);
          margin:5px 0 0 0;
          font-size: 20px;
          font-weight: 400;
          margin-bottom: 20px;
          
        }
        
        .side .bottom {
        }
        
        .bottom_space {
          margin-top:20px; 
        }

        
        .page > .main {
          width:86%; 
          // margin-top: 150px;
          // overflow: hidden;
          // overflow-x:scroll;
        }
        .page > .main > .inner-main {
            display:flex;
            flex-direction:row;
            align-items:center;
            height:100%;
            margin:auto;
        }
        .page > .main > .inner-main > .cover {
          width:150px;
          display:inline-block;
        }
        
        .cover .icon {
          margin: 0 auto;
          text-align:center;
          display:block;
          height: 40px;
          width: 40px;
          color: rgba(255,255,255,0.3);
          font-size: 30px;
          padding-top:5px;
        }
        .cover .icon ha-icon {
          width:30px;
          height:30px;
        }
        .cover .icon.on ha-icon {
          fill: #f7d959;
        }
        h2 {
          color: var(--primary-text-color);
          display: block;
          font-weight: 300;
          margin-bottom: 10px;
          text-align: center;
          font-size:20px;
          margin-top:0;
        }
        h4 {
          color: var(--primary-text-color);
          display: block;
          font-weight: 300;
          margin-bottom: 30px;
          text-align: center;
          font-size:16px;
          margin-top:0;
        }
        h4.cover:after {
          content: "%";
          padding-left: 1px;
        }
        
        .range-holder {
          height: var(--slider-height);
          position:relative;
          display: block;
        }
        .range-holder input[type="range"] {
          outline: 0;
          border: solid 2px var(--coverbackground);
          border-radius: var(--ha-card-border-radius);
          width: var(--slider-height);
          margin: 0;
          transition: box-shadow 0.2s ease-in-out;
          -webkit-transform:rotate(90deg);
          -moz-transform:rotate(90deg);
          -o-transform:rotate(90deg);
          -ms-transform:rotate(90deg);
          transform:rotate(90deg);
          overflow: hidden;
          height: var(--slider-width);
          -webkit-appearance: none;
          background-color: var(--coverbackground);
          position: absolute;
          top: calc(50% - (var(--slider-width) / 2));
          right: calc(50% - (var(--slider-height) / 2));
        }
        .range-holder input[type="range"]::-webkit-slider-runnable-track {
          height: var(--slider-width);
          -webkit-appearance: none;
          color: #636363;
          margin-top: -1px;
          transition: box-shadow 0.2s ease-in-out;
        }
        .range-holder input[type="range"]::-webkit-slider-thumb {
          width: 25px;
          border-right:10px solid var(--covercolor);
          border-left:10px solid var(--covercolor);
          border-top:20px solid var(--covercolor);
          border-bottom:20px solid var(--covercolor);
          -webkit-appearance: none;
          height: 80px;
          cursor: ns-resize;
          background: var(--covercolor);
          box-shadow: -350px 0 0 350px var(--covercolor), inset 0 0 0 80px #e3edf7;
          border-radius: 25px;
          transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - 80px) / 2);
        }
        .range-holder input[type="range"].on::-webkit-slider-thumb {
            border-color: #1c7ae2;
            box-shadow: -350px 0 0 350px #1c7ae2, inset 0 0 0 80px #FFF;
        }
        
        
        .push {
          margin-top:10px;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .push > input.push-btn {
          display: none;
        }
        .push > input.push-btn + label {
          border: 0px solid rgba(57,128,228,0.4);
          background: var(--coverbackground);

          width:70px;
          height:50px;
          text-align:center;
          line-height:50px;
          cursor: pointer;
          border-radius: 15px;
          color: #b2abcf;
          display:block;
          font-size:22px;
        }

        .push > input.push-btn + label:active,
        .push:hover > input.push-btn + label {
          background: var(--state-icon-active-color);
          color: #fff;
          border-color: #1c7ae2;
        }


      
    `;
  }  
  
}

customElements.define('shutter-cover-panel-card', ShutterCoverPanelcard);
