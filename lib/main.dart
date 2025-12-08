import 'package:jaspr/server.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:jaspr_content/theme.dart';

import 'components/header.dart';
import 'jaspr_options.dart';
import 'layouts/blog_layout.dart';
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
      theme: ContentTheme(
        typography: ContentTypography.base.apply(
          rules: [
            css('a').styles(
              color: ThemeColor(ThemeColors.violet.$400),
            ),
            css('a:visited').styles(
              color: ThemeColor(
                ThemeColors.violet.$600,
              ),
            ),
          ],
        ),
      ),
      layouts: [
        CustomBlogLayout(header: const Header()),
        const ResumeLayout(),
        const MainLayout(),
      ],
    ),
  );
}
