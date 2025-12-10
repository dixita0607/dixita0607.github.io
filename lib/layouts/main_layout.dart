import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';

import '../components/footer.dart';
import '../components/header.dart';

class MainLayout extends PageLayoutBase {
  const MainLayout();

  @override
  Pattern get name => 'main';

  @override
  Component buildBody(Page page, Component child) {
    return div(classes: 'main-layout', [
      Header(currentPath: page.url),
      main_(classes: 'container', [
        child,
      ]),
      const Footer(),
    ]);
  }

  @override
  Iterable<Component> buildHead(Page page) sync* {
    yield* super.buildHead(page);

    yield Style(
      styles: [
        css('.main-layout', [
          css('&').styles(
            display: .flex,
            minHeight: 100.vh,
            flexDirection: .column,
          ),
        ]),
        css('.container', [
          css('&').styles(
            display: .flex,
            justifyContent: .center,
            flex: Flex(grow: 1),
            width: 100.percent,
            padding: .all(2.em),
          ),
        ]),
        css('.container .content', [
          css('&').styles(
            maxWidth: 1200.px,
            width: 100.percent,
          ),
        ]),
        css('.container img', [
          css('&').styles(
            maxWidth: 100.percent,
            maxHeight: 300.px,
            height: .auto,
          ),
        ]),
      ],
    );
  }
}
