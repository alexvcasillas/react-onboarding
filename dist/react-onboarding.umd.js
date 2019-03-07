!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["exports","react","prop-types"],t):t((e=e||self).ReactOnboarding={},e.React,e.PropTypes)}(this,function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n;const s=function(){const e={};function t(t){console.log("setStep: ",t),e[t]||(e[t]={})}return{tree:e,setStep:t,setField:function(n,r){console.log("setField: ",n,r),void 0===e[r]&&t(r),e[r][n]=null},setFieldValue:function(t,n,r){console.log("setFieldValue: ",t,n,r),void 0!==e[n]&&void 0!==e[n][t]&&(e[n][t]=r)}}}(),p="Step",i="Field",o=require("uuid/v4");const{Provider:a,Consumer:u}=t.createContext();class c extends t.Component{constructor(e){super(e),r(this,"nextStep",()=>{const{currentStep:e}=this.state;e+1>=this.numberOfSteps||this.setState(e=>({...e,currentStep:e.currentStep+1}))}),r(this,"onboardingRenderer",()=>{const{children:e}=this.props,{currentStep:t}=this.state;let n=0,r=!1;return e.filter(e=>e.type.name!==p||(n!==t||r?(n+=1,!1):(r=!0,!0))).map(e=>{if(e.type.name!==p)return e;const t=e.props.name.replace(/-/gi,"_");return s.setStep(t),function(e,t={}){return e.type.name!==p?e:{...e,key:o(),props:{...e.props,__enhancements:t}}}(e,{nextStep:this.nextStep})})}),this.state={initialStep:e.initialStep||0,currentStep:e.initialStep||0},this.numberOfSteps=e.children.filter(e=>e.type.name===p).length}shouldComponentUpdate(e,t){const{currentStep:n}=this.state;return n!==t.currentStep}render(){const{currentStep:e}=this.state;return t.createElement(a,{value:{numberOfSteps:this.numberOfSteps,currentStep:e+1,onboarding:s.tree}},this.onboardingRenderer())}}c.propTypes={initialStep:n.number};class l extends t.Component{constructor(e){super(e),r(this,"stepRenderer",()=>{const{children:e,name:t,__enhancements:{nextStep:n}}=this.props;return e({nextStep:n}).props.children.map(e=>(function(e,t={}){return e.type.name!==i?e:{...e,key:o(),props:{...e.props,__enhancements:t}}})(e,{step:t.replace(/-/gi,"_")}))})}render(){return this.stepRenderer()}}l.propTypes={name:n.string.isRequired,__enhancements:n.shape({nextStep:n.func.isRequired})};class d extends t.Component{render(){const{children:e}=this.props;return e||null}}d.propTypes={};class h extends t.Component{constructor(e){super(e),r(this,"onChange",e=>{s.setFieldValue(this.snaked_name,this.step,e.target.value),this.setState({value:e.target.value})});const{__enhancements:{step:t}}=this.props;this.snaked_name=e.name.replace(/-/gi,"_"),this.step=t,s.setField(this.snaked_name,t),this.state={type:e.type,value:""}}render(){const{children:e}=this.props,{type:t,value:n}=this.state;return e({value:n,type:t,onChange:this.onChange})}}h.propTypes={title:n.string},e.Onboarding=c,e.Info=u,e.Step=l,e.Fieldset=d,e.Field=h,Object.defineProperty(e,"__esModule",{value:!0})});
