# snip-file
You want to make a quick skeleton for a [VS Code snippet](https://code.visualstudio.com/docs/editor/userdefinedsnippets) from a file, then all ya gotta do is:
```
npx snip-file <path-to-file>
```

You'll then get an output like:
```
{
    "body": [
        "This would be filled with the contents of your file"
    ]
}
```

It doesn't add all the props of the code snippet, but you can do a little work haha.