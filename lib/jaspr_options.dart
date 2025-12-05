// dart format off
// ignore_for_file: type=lint

// GENERATED FILE, DO NOT MODIFY
// Generated with jaspr_builder

import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/components/theme_toggle.dart' as prefix0;
import 'package:jaspr_site/components/header.dart' as prefix1;

/// Default [JasprOptions] for use with your jaspr project.
///
/// Use this to initialize jaspr **before** calling [runApp].
///
/// Example:
/// ```dart
/// import 'jaspr_options.dart';
///
/// void main() {
///   Jaspr.initializeApp(
///     options: defaultJasprOptions,
///   );
///
///   runApp(...);
/// }
/// ```
JasprOptions get defaultJasprOptions => JasprOptions(
  clients: {
    prefix0.ThemeToggle: ClientTarget<prefix0.ThemeToggle>(
      'jaspr_content:components/theme_toggle',
    ),
  },
  styles: () => [...prefix0.ThemeToggleState.styles, ...prefix1.Header.styles],
);
