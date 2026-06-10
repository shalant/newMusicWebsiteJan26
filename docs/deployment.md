# Deployment



---

## Before Publishing — Fix the Filename Bug

One file in `wwwroot/sheetmusic/` has special characters in its name that break `dotnet publish`:

```
Put+Your+Records+On+Arrangement+-+Electric+Piano,+Trumpet+in+Bb.pdf
```

**Fix:**
1. Rename the file to something like `PutYourRecordsOn.pdf`
2. Update its entry in `sample-data/sheetmusic.json` — the `url` field already says `PutYourRecordsOn.pdf`, so it may already match after renaming

---

## Building for Production

```bash
cd src/BlazorApp
```




```









```bash
cd src/BlazorApp
```

