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
      const Header(),
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
            display: Display.flex,
            minHeight: 100.vh,
            flexDirection: FlexDirection.column,
          ),
        ]),
        css('.container', [
          css('&').styles(
            flex: Flex(grow: 1),
            width: 100.percent,
            maxWidth: 1200.px,
            margin: .symmetric(horizontal: Unit.auto),
            padding: .all(2.rem),
          ),
        ]),
      ],
    );
  }
}
