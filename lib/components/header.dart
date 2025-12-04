import 'package:jaspr/jaspr.dart';

class Header extends StatelessComponent {
  const Header({super.key});

  @override
  Component build(BuildContext context) {
    return header([
      div([
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
        ]),
      ]),
    ]);
  }

  @css
  static List<StyleRule> get styles => [
    css('header', [
      css('&').styles(
        display: .flex,
        padding: .all(1.em),
        justifyContent: .center,
      ),
      css('nav', [
        css('&').styles(
          display: .flex,
          height: 3.em,
          radius: .all(.circular(10.px)),
          overflow: .clip,
          justifyContent: .spaceBetween,
          backgroundColor: Colors.black,
        ),
        css('a', [
          css('&').styles(
            display: .flex,
            height: 100.percent,
            padding: .symmetric(horizontal: 2.em),
            alignItems: .center,
            color: Colors.white,
            fontWeight: .w700,
            textDecoration: const TextDecoration(line: .none),
          ),
          css('&:hover').styles(
            backgroundColor: const Color('#0005'),
          ),
        ]),
        css('div.active', [
          css('&').styles(position: const .relative()),
          css('&::before').styles(
            content: '',
            display: .block,
            position: .absolute(bottom: 0.5.em, left: 20.px, right: 20.px),
            height: 2.px,
            radius: .circular(1.px),
            backgroundColor: Colors.white,
          ),
        ]),
      ]),
    ]),
  ];
}
