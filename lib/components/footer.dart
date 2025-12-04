import 'package:jaspr/jaspr.dart';

class Footer extends StatelessComponent {
  const Footer({super.key});

  @override
  Component build(BuildContext context) {
    return footer([
      div([
        a(
          href: 'https://jaspr.site',
          target: .blank,
          [
            text('Built with Jaspr'),
          ],
        ),
        text(' · '),
        a(href: 'https://github.com/dixita0607/dixita0607.github.io', [text('Source')]),
      ]),
    ]);
  }
}
