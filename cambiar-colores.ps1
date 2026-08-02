$files = Get-ChildItem src -Recurse -Include *.css,*.vue,*.js

foreach ($f in $files) {
  $c = Get-Content $f.FullName -Raw

  if ($null -eq $c) {
    continue
  }

  $c = $c.Replace('#0b83b0', '#42a8a1')
  $c = $c.Replace('#159bd0', '#42a8a1')
  $c = $c.Replace('#29abe2', '#5dc1b9')
  $c = $c.Replace('#45b9e9', '#5dc1b9')
  $c = $c.Replace('#69c6ee', '#5dc1b9')
  $c = $c.Replace('#95d5f1', '#cfecea')
  $c = $c.Replace('#bfe6f7', '#e6f5f4')
  $c = $c.Replace('#e8fbfc', '#ffffff')
  $c = $c.Replace('#f6fdff', '#ffffff')
  $c = $c.Replace('#073b52', '#123f3c')
  $c = $c.Replace('#0b4f6b', '#123f3c')
  $c = $c.Replace('#09698e', '#42a8a1')
  $c = $c.Replace('#005f88', '#42a8a1')
  $c = $c.Replace('#006b95', '#42a8a1')
  $c = $c.Replace('#36a9d6', '#5dc1b9')
  $c = $c.Replace('#0b3954', '#123f3c')
  $c = $c.Replace('#004e73', '#123f3c')
  $c = $c.Replace('#239089', '#42a8a1')
  $c = $c.Replace('#57bbb4', '#5dc1b9')
  $c = $c.Replace('#1f5f5b', '#123f3c')

  $c = $c.Replace('rgba(11, 79, 107', 'rgba(66, 168, 161')
  $c = $c.Replace('rgba(11, 57, 84', 'rgba(66, 168, 161')
  $c = $c.Replace('rgba(0, 107, 149', 'rgba(66, 168, 161')
  $c = $c.Replace('rgba(0, 102, 179', 'rgba(66, 168, 161')
  $c = $c.Replace('rgba(0, 168, 232', 'rgba(93, 193, 185')
  $c = $c.Replace('rgba(21, 155, 208', 'rgba(66, 168, 161')
  $c = $c.Replace('rgba(7, 59, 82', 'rgba(18, 63, 60')

  Set-Content $f.FullName $c
}