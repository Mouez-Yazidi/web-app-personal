# Répertoire Nextcare

A framework-free, responsive directory of Nextcare providers in Tunisia. Search by name, address or telephone number, filter by governorate, provider type and area, and switch between light and dark themes. The directory currently contains the 733 records extracted from the workbook dated 01 September 2026.

## Run locally

Open `dist/index.html` in a browser, or serve the folder locally:

```sh
cd dist
python -m http.server 8000
```

Open `http://localhost:8000/`. Python is only needed for the optional local server and data extraction, not for the application itself.

## Deploy on the internet with GitHub Pages

The included workflow publishes the contents of `dist/`; no framework, package installation or build step is needed.

1. Push this repository to GitHub. The workflow is configured for the `master` branch. If your default branch has a different name, change the branch under `on.push.branches` in `.github/workflows/pages.yml` before pushing.
2. On GitHub, open the repository and go to **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab, select **Deploy to GitHub Pages**, and run it with **Run workflow** if the initial push occurred before Pages was configured. Future pushes to the configured branch deploy automatically.
4. Once the workflow succeeds, open the URL shown under **Settings → Pages** or in the workflow's deployment details. A project site normally uses `https://<owner>.github.io/<repository>/`. Open that URL on a computer or phone.

GitHub Pages availability depends on your GitHub plan and repository visibility. A published Pages site is publicly accessible; its provider data is downloaded by visitors. Review the data before publishing. See [GitHub's Pages publishing-source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for current requirements and troubleshooting.

Alternatively, upload the contents of `dist/` to any static web host, with `index.html` at the site's root. Keep `index.html`, `style.css`, `app.js`, and `data.js` together.

## Update the directory

Place one replacement `.xlsx` file in the parent folder and run `python extract.py` from this project directory. The extractor expects the same six-column layout and shared-string format as the original workbook. Check the output in a browser, then commit and push the updated `dist/data.js` to redeploy. The original workbook is not included in this repository.

