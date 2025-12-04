import 'package:jaspr/server.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:jaspr_content/theme.dart';
import 'package:jaspr_site/components/header.dart';

import 'jaspr_options.dart';
import 'layouts/main_layout.dart';
import 'layouts/resume_layout.dart';

void main() {
  Jaspr.initializeApp(
    options: defaultJasprOptions,
  );
  runApp(
    ContentApp(
      eagerlyLoadAllPages: true,
      parsers: [
        HtmlParser(),
        MarkdownParser(),
      ],
      templateEngine: LiquidTemplateEngine(),
      layouts: [
        BlogLayout(header: Header()),
        const ResumeLayout(),
        const MainLayout(),
      ],
      theme: ContentTheme(
        primary: ThemeColor(const Color('#01589B'), dark: const Color('#41C3FE')),
        background: ThemeColor(Colors.white, dark: const Color('#0b0d0e')),
        text: ThemeColor(ThemeColors.gray.$700, dark: ThemeColors.gray.$200),
        font: const FontFamily.list([FontFamily('Roboto'), FontFamilies.sansSerif]),
      ),
    ),
  );
}
