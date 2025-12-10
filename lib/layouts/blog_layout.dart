import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';

import '../components/header.dart';

class CustomBlogLayout extends BlogLayout {
  CustomBlogLayout() : super(header: const Header());

  @override
  Iterable<Component> buildHead(Page page) sync* {
    yield* super.buildHead(page);

    yield Style(
      styles: [
        css('.blog .main-container main', [
          css('&').styles(
            maxWidth: 1200.px,
            textAlign: .left,
            padding: .symmetric(horizontal: 0.px),
          ),
        ]),
        css.media(MediaQuery.raw('(max-width: 600px)'), [
          css('.blog .main-container main', [
            css('&').styles(
              padding: .symmetric(horizontal: 2.em),
            ),
          ]),
        ]),
        css('.main-container main img', [
          css('&').styles(
            maxWidth: 100.percent,
            maxHeight: 500.px,
            height: .auto,
            display: .block,
            margin: .symmetric(vertical: 1.em, horizontal: 0.px),
          ),
        ]),
      ],
    );
  }
}
