
$files = Get-ChildItem "client\src\pages\*.doc"
if ($files.Count -eq 0) {
    Write-Error "No .doc file found"
    exit 1
}
$docPath = $files[0].FullName
Write-Host "Opening document: $docPath"

$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    $doc = $word.Documents.Open($docPath)
    $text = $doc.Content.Text
    $text | Out-File -FilePath "extracted_doc_text.txt" -Encoding utf8
    $doc.Close()
}
finally {
    $word.Quit()
}
