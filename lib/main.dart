import 'package:jaspr/server.dart';
import 'package:jaspr_content/jaspr_content.dart';

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
      layouts: [
        CustomBlogLayout(header: const Header()),
        const ResumeLayout(),
        const MainLayout(),
      ],
    ),
  );
}
