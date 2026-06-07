import 'package:jaspr/dom.dart';
import 'package:jaspr/server.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:jaspr_content/theme.dart';

import 'layouts/blog_layout.dart';
import 'layouts/main_layout.dart';
import 'layouts/resume_layout.dart';
import 'main.server.options.dart';

void main() {
  Jaspr.initializeApp(
    options: defaultServerOptions,
  );
  runApp(
    ContentApp.custom(
      loaders: [
        FilesystemLoader('content'),
      ],
      eagerlyLoadAllPages: true,
      configResolver: PageConfig.all(
        dataLoaders: [
          FilesystemDataLoader('content/_data'),
        ],
        parsers: [
          HtmlParser(),
          MarkdownParser(),
        ],
        templateEngine: LiquidTemplateEngine(),
        secondaryOutputs: [
          RSSOutput(
            title: 'Dixita Ganatra',
            description: 'Blogs by Dixita Ganatra',
            siteUrl: 'https://dixita.dev',
            language: 'en-US',
            filter: RSSFilter.custom((page) => page.url.startsWith('/blog/')),
          ),
        ],
        theme: ContentTheme(
          colors: [
            ContentColors.links.apply(ThemeColor(ThemeColors.violet.$400)),
          ],
          typography: ContentTypography.base.apply(
            rules: [
              css('pre, code').styles(
                backgroundColor: Color.variable('--content-hr'),
                padding: .all(0.2.em),
                radius: BorderRadius.circular(0.5.em),
                fontWeight: .normal,
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
    ),
  );
}
