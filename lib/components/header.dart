import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/components/theme_toggle.dart';
import 'package:jaspr_content/theme.dart';

class Header extends StatelessComponent {
  final String? currentPath;

  const Header({this.currentPath, super.key});

  @override
  Component build(BuildContext context) {
    return header([
      div(classes: 'header-content', [
        div(classes: 'title', [
          a(
            href: '/',
            classes: _isActive('/') ? 'active' : null,
            [text('Dixita Ganatra')],
          ),
        ]),
        nav([
          for (var route in [
            (label: 'Blog', path: '/blog'),
            (label: 'Projects', path: '/projects'),
            (label: 'What else?', path: '/not-much'),
          ])
            a(
              href: route.path,
              classes: _isActive(route.path) ? 'nav-item active' : 'nav-item',
              [text(route.label)],
            ),
          ThemeToggle(),
        ]),
      ]),
    ]);
  }

  bool _isActive(String href) {
    if (currentPath == null) return false;
    if (href == '/') return currentPath == '/';
    if (href == '/not-much') {
      return currentPath == '/coffee' || currentPath == '/books' || currentPath!.startsWith('/not-much');
    }
    return currentPath!.startsWith(href);
  }

  @css
  static List<StyleRule> get styles => [
    css('header', [
      css('&').styles(
        display: .flex,
        padding: .fromLTRB(2.em, 3.em, 2.em, 0.em),
        justifyContent: .center,
      ),
      css('.header-content', [
        css('&').styles(
          display: .flex,
          flexDirection: .column,
          maxWidth: 1200.px,
          width: 100.percent,
        ),
      ]),
      css('.title', [
        css('&').styles(
          margin: .only(bottom: .em(1.5)),
        ),
        css('a', [
          css('&').styles(
            fontSize: 2.5.em,
            fontWeight: .w400,
            textDecoration: TextDecoration(line: .none),
            color: ThemeColor(ThemeColors.violet.$400),
          ),
        ]),
      ]),
      css('nav', [
        css('&').styles(
          display: .flex,
          flexWrap: .wrap,
          alignItems: .center,
          gap: .all(.em(1.5)),
        ),
        css('a', [
          css('&').styles(
            fontSize: 1.1.em,
            textDecoration: TextDecoration(line: .none),
            fontWeight: .w400,
          ),
        ]),
        css('a.active', [
          css('&').styles(
            color: ThemeColor(ThemeColors.violet.$400),
            fontWeight: .w600,
            textDecoration: TextDecoration(line: .underline),
          ),
        ]),
      ]),
    ]),
  ];
}
