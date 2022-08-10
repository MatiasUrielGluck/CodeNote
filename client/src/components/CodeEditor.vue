<template>
    <div style="height: 200px;">
        <textarea placeholder="Enter code" id="editing" spellcheck="false" @input="update(this.value); sync_scroll(this);" @scroll="sync_scroll(this);" @keydown="check_tab(this, event);"></textarea>
        <pre id="highlighting" aria-hidden="true">
            <code class="language-js" id="highlighting-content">
                
            </code>
        </pre>
    </div>
</template>

<script>
export default {
    name: 'CodeEditor',

    methods: {
        update(text) {
            let result_element = document.querySelector("#highlighting-content");
            // Handle final newlines (see article)
            if(text[text.length-1] == "\n") {
            text += " ";
            }
            // Update code
            result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
            // Syntax Highlight
            Prism.highlightElement(result_element);
        },

        sync_scroll(element) {
            /* Scroll result to scroll coords of event - sync with textarea */
            let result_element = document.querySelector("#highlighting");
            // Get and set x and y
            result_element.scrollTop = element.scrollTop;
            result_element.scrollLeft = element.scrollLeft;
        },

        check_tab(element, event) {
            let code = element.value;
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
#editing, #highlighting {
    /* Both elements need the same text and space styling so they are directly on top of each other */
    margin: 10px;
    padding: 10px;
    border: 0;
    width: calc(100% - 32px);
    height: 150px;
  }
  #editing, #highlighting, #highlighting * {
    /* Also add text styles to highlighing tokens */
    font-size: 15pt;
    font-family: monospace;
    line-height: 20pt;
    tab-size: 2;
  }
  
  
  #editing, #highlighting {
    /* In the same place */
    position: absolute;
    top: 0;
    left: 0;
  }
  
  #editing {
    top: 0.5rem;
    left: 0.5rem;
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
  
  /* Paragraphs; First Image */
  * {
    font-family: "Fira Code", monospace;
  }
  p code {
    border-radius: 2px;
    background-color: #eee;
    color: #111;
  }
</style>