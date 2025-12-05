import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/components/theme_toggle.dart';

class Header extends StatelessComponent {
  const Header({super.key});

  @override
  Component build(BuildContext context) {
    return header([
      div(classes: 'header-content', [
        div(classes: 'title', [
          a(href: '/', [text('Dixita Ganatra')]),
        ]),
        nav([
          for (var route in [
            (label: 'Blog', path: '/blog'),
            (label: 'Projects', path: '/projects'),
            (label: 'books', path: '/books'),
            (label: 'Contact', path: '/contact'),
            (label: 'Resume', path: '/resume'),
          ])
            a(
              href: route.path,
              target: route.path == '/resume' ? Target.blank : null,
              classes: 'nav-item',
              [text(route.label)],
            ),
          ThemeToggle(),
        ]),
      ]),
    ]);
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
          ),
        ]),
      ]),
      css('nav', [
        css('&').styles(
          display: .flex,
          alignItems: .center,
        ),
        css('a', [
          css('&').styles(
            fontSize: 1.1.em,
            textDecoration: TextDecoration(line: .none),
            fontWeight: .w400,
            margin: .only(right: .em(1.5)),
          ),
        ]),
      ]),
    ]),
  ];
}
