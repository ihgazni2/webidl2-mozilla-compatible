# webidl2-mozilla-compatible

This forked from https://github.com/w3c/webidl2.js

## add some features for  mozilla-webidl-file

https://dxr.mozilla.org/mozilla-central/source/dom/webidl/


## Installation

Just the usual. For Node:

```Bash
npm install webidl2-mozilla-compatible
```

## Documentation

### 0.enable-mozilla-namespaces-constants

    var wbidl2 = require("webidl2-mozilla-compatible")
    
    var s =`namespace APZHitResultFlags {
      const unsigned short INVISIBLE = 0;
    };`
    
    
    console.log(s)
    
    var tree = webidl2.parse(s,{enableMozillaNamespacesConstants:true});
    var d = JSON.parse(JSON.stringify(tree))
    d[0]
    d[0].members
    var txt = webidl2.write(tree);
    console.log(txt)

### 1.enable-mozilla-bodyless-interface

    var webidl2 = require("webidl2-mozilla-compatible");
    var s ="interface MozObserver;"
    var tree = webidl2.parse(s,{enableMozillaBodylessInterface:true})
    var d = JSON.parse(JSON.stringify(tree))
    d


------------------------------------------------------------------------------------------------
