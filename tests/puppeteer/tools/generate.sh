#!/bin/bash

set -e

testFilingDir=tests/puppeteer/test_filings
genDir=tests/puppeteer/artifacts/generated_output
mkdir -p $genDir

for file in "$testFilingDir"/*.zip; do
    echo "Generating ixbrl-viewer for: $file"
    outputFilename=$(basename -- "$file")
    viewerName=${outputFilename%.zip}.htm
    arelleCmdLine --plugins ixbrl-viewer -f $file --save-viewer $genDir/$viewerName --viewer-url ../../../../iXBRLViewerPlugin/viewer/dist/ixbrlviewer.js --viewer-no-copy-script
#arelleCmdLine --plugins ixbrl-viewer -f https://xbrl.ifrs.org/taxonomy/ifrs_sds/2024-04-26/ifrs_sds_ext_2024-04-26.xsd --saveJson --save-viewer $genDir/ifrs_sds_ext_2024-04-26.json  --viewer-no-copy-script
#arelleCmdLine --plugins ixbrl-viewer -f https://xbrl.ifrs.org/taxonomy/ifrs_sds/2024-04-26/ifrs_sds_2024-04-26.xsd --saveJson --save-viewer $genDir/ifrs_sds_2024-04-26.json --viewer-no-copy-script
done
echo "iXBRL-Viewer Generation Complete"
