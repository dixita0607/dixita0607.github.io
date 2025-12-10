import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/theme.dart';

class Footer extends StatelessComponent {
  const Footer({super.key});

  @override
  Component build(BuildContext context) {
    return footer([
      div(classes: 'footer-content', [
        a(
          href: 'https://jaspr.site',
          target: .blank,
          [
            text('Built with Jaspr'),
          ],
        ),
        text(' · '),
        a(href: 'https://github.com/dixita0607/dixita0607.github.io', target: .blank, [text('Source code')]),
      ]),
    ]);
  }

  @css
  static List<StyleRule> get styles => [
    css('footer', [
      css('&').styles(
        display: .flex,
        justifyContent: .center,
        padding: .symmetric(vertical: 2.rem, horizontal: 1.5.rem),
      ),
      css('.footer-content', [
        css('&').styles(
          display: .flex,
          flexWrap: .wrap,
          justifyContent: .center,
          gap: .all(.em(0.5)),
          textAlign: .center,
          maxWidth: 1200.px,
        ),
        css('a', [
          css('&').styles(
            color: ThemeColor(ThemeColors.violet.$400),
            textDecoration: TextDecoration(line: .none),
          ),
        ]),
      ]),
    ]),
  ];
}
