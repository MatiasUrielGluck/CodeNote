<template>
    <div id="code-editor">
        <textarea v-model="userInput" placeholder="Enter code" id="editing" spellcheck="false" @input="update(userInput); sync_scroll();" @scroll="sync_scroll();" @keydown="check_tab($event);"></textarea>
        <pre id="highlighting" aria-hidden="true">
            <code :class="`language-${lang}`" id="highlighting-content">
                
            </code>
        </pre>
    </div>
</template>

<script>

import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";
import store from '@/store'

// Remember to import here all the langs!!! #TODO
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-python';


export default {
    name: 'CodeEditor',

    props: {
      lang: String,
    },

    data: function() {
      return {
        userInput: '',
      }
    },

    methods: {
        updateSharedState(newValue) {
          store.state.codeEditorText = newValue
        },

        update(text) {
            let result_element = document.querySelector("#highlighting-content");
            // Handle final newlines
            if(text[text.length-1] == "\n") {
            text += " ";
            }
            // Update code
            result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
            // Syntax Highlight
            Prism.highlightElement(result_element);
            this.updateSharedState(result_element.innerHTML)
        },

        sync_scroll() {
            /* Scroll result to scroll coords of event - sync with textarea */
            let result_element = document.querySelector("#highlighting");
            let element = document.querySelector("#editing");
            // Get and set x and y
            result_element.scrollTop = element.scrollTop;
            result_element.scrollLeft = element.scrollLeft;
        },

        check_tab(event) {
            let code = this.userInput;
            let element = document.querySelector("#editing");
            if(event.key == "Tab") {
                /* Tab key pressed */
                event.preventDefault(); // stop normal
                let before_tab = code.slice(0, element.selectionStart); // text before tab
                let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
                let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
                element.value = before_tab + "\t" + after_tab; // add tab char
                // move cursor
                element.selectionStart = cursor_pos;
                element.selectionEnd = cursor_pos;
                this.update(element.value); // Update text to include indent
            }
        }
    }
}
</script>

<style scoped>
#code-editor {
  position: relative;
  width: 100%;
  height: 100%;
}

#editing, #highlighting {
    margin: 10px;
    padding: 10px;
    border: 0;
    width: 98%;
    /* height: 150px; */
    height: 100%;
  }
  
  #editing, #highlighting  {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1.125rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  }
  
  #editing, #highlighting {
    /* In the same place */
    position: absolute;
    top: 0;
    left: 0;
  }
  
  #editing {
    top: 0rem;
    left: 0rem;
  }

  #editing:focus {
    outline: none;
  }
  
  /* Move the textarea in front of the result */
  
  #editing {
    z-index: 1;
  }
  #highlighting {
    z-index: 0;
  }
  
  
  /* Make textarea almost completely transparent */
  
  #editing {
    color: transparent;
    background: transparent;
    caret-color: white; /* Or choose your favourite color */
  }
  
  /* Can be scrolled */
  #editing, #highlighting {
    overflow: auto;
    white-space: nowrap; /* Allows textarea to scroll horizontally */
  }
  
  /* No resize on textarea */
  #editing {
    resize: none;
  }
</style>