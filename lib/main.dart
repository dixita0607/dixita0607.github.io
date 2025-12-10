import 'package:jaspr/server.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:jaspr_content/theme.dart';

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
        colors: [
          ContentColors.links.apply(ThemeColor(ThemeColors.violet.$400)),
        ],
        typography: ContentTypography.base.apply(
          rules: [
            css('a:visited').styles(
              color: ThemeColor(
                ThemeColors.violet.$600,
              ),
            ),
            css('pre, code').styles(
              backgroundColor: Color.variable('--content-hr'),
              padding: .all(0.2.em),
              radius: BorderRadius.circular(0.5.em),
            ),
          ],
        ),
      ),
      layouts: [
        CustomBlogLayout(),
        const ResumeLayout(),
        const MainLayout(),
      ],
    ),
  );
}
