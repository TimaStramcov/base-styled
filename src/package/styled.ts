import React from 'react'
import {compile, middleware, prefixer, serialize, stringify} from 'stylis'


const style = document.createElement("style");
document.head.appendChild(style);

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function css(styles: string) {

    if (!style.sheet) return null
    // const index = style.sheet.cssRules.length;
    const className = `css-${makeid(5)}`;
    
    const rule = serialize(compile(`.${className} { ${styles} }`), middleware([prefixer, stringify]));
    
    style.appendChild(document.createTextNode(rule));
    // style.sheet.insertRule(rule, index);
    
    return className;
  }

  function interleave(strings: TemplateStringsArray, interpolations: any[]) {
    return strings.reduce(
      (final, str, i) =>
        final +
        str +
        (interpolations[i] === undefined
          ? ""
          : interpolations[i]),
      ""
    )
  }
  
type Element = React.DetailedReactHTMLElement<any, HTMLElement> | null |  React.FunctionComponentElement<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>
type StyledElement = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => Element


export function styled(element: keyof HTMLElementTagNameMap | StyledElement): 
  (rules: TemplateStringsArray, ...args: any | undefined) => StyledElement {
    return function styledTemplate(rules, ...args): StyledElement {
      
        return function Component(props): Element {
          const resolved = interleave(rules, args);
          const propsClassName = props.className || ""
          const className = css(resolved) + " " +  propsClassName;
          
          if (!className) return null 

          if (typeof element === "string") return React.createElement(element, { className, ...props });
          if (!!element){
            return React.createElement(element, { className, ...props })
          }

          return null
        };
      };
  }