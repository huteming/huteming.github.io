**在 sass 中，使用函数快速添加 css 的媒体查询**

```scss
$mediaPhone: 480px;
$mediaTablet: 768px;

@function translate-media-condition($c) {
  $condMap: (
    'phone': '(max-width: #{$mediaPhone})',
    'tablet': '(max-width: #{$mediaTablet})',
  );
  @return map-get($condMap, $c);
}

@mixin media($args...) {
  $query: '';
  @each $arg in $args {
    $op: '';
    @if ($query != '') {
      $op: ' and ';
    }
    $query: $query + $op + translate-media-condition($arg);
  }
  @media #{$query} {
    @content;
  }
}
```

**使用**

```scss
.class {
  @include media('phone') {
  }
}

// 编译生成
.class {
  @media (max-width: 480px) {
  }
}
```

## 参考

- [Media Queries in Sass](https://css-tricks.com/approaches-media-queries-sass/)
