# snip-file
You want to make a quick skeleton for a [VS Code snippet](https://code.visualstudio.com/docs/editor/userdefinedsnippets) from a file, then all ya gotta do is:
```
npx snip-file --prefix example --description "Snippet description" <path-to-file>
```

You'll then get an output like:
```json
{
    "prefix": "example",
    "description": "Snippet description",
    "body": [
        "This would be filled with the contents of your file"
    ]
}
```

**Note:** Providing the `--prefix` or `--description` is absolutely optional. You can provide one or the other, or none. In the case that you don't provide one, its value will then default to the empty string.
