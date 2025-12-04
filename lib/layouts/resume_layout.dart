import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';

/// Standalone resume layout - displays as a document without site navigation
class ResumeLayout extends PageLayoutBase {
  const ResumeLayout();

  @override
  Pattern get name => 'resume';

  @override
  Component buildBody(Page page, Component child) {
    return child;
  }

  @override
  Iterable<Component> buildHead(Page page) sync* {
    yield* super.buildHead(page);

    yield raw('<style>$_resumeStyles</style>');
  }

  static const _resumeStyles = '''
    body {
      background: #EEEEEE;
      font: 13px "Times New Roman", Times, sans-serif;
      line-height: 1.4;
      margin: 40px 0;
    }
    em {
      color: #999;
    }
    p {
      line-height: 1.4;
    }
    ul {
      margin-bottom: 0;
    }
    li {
      margin-bottom: 2px;
    }
    a {
      text-decoration: none;
    }
    
    #resume {
      margin: 0 auto;
      max-width: 900px;
      padding: 80px 100px;
      background: #fff;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 4px #aaa;
      -webkit-box-shadow: 2px 2px 4px #aaa;
    }
    
    .coursesList {
      width: 28%;
      vertical-align: top;
      display: inline-block;
    }
    
    .largeFont {
      font-size: 20px;
    }
    
    .smallFont {
      font-size: 13px;
    }
    
    .sectionBlock {
      display: flex;
      width: 100%;
      gap: 10px;
    }
    
    .sectionName {
      width: 18%;
      min-width: 100px;
      flex-shrink: 0;
    }
    
    .sectionContent {
      flex: 1;
    }
    
    .sectionContent ul {
      padding-left: 20px;
      margin-top: 6px;
      list-style-type: circle;
    }
    
    .sectionContent .title {
      font-weight: bold;
    }
    
    .sectionContent .date {
      float: right;
    }
    
    .sectionContent .separator {
      height: 14px;
    }
    
    .sectionLine {
      border-style: dashed;
      border-width: 1px;
      border-color: #CFCFCF;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    
    .divider {
      font-weight: bold;
      margin-left: 5px;
      margin-right: 5px;
    }
    
    .summary {
      margin-top: 6px;
    }
    
    .skillBlock {
      margin-bottom: 4px;
    }
    
    .jobBlock {
      page-break-inside: avoid;
    }
    
    /* Media Queries */
    @media only screen and (max-width: 40em) {
      body {
        margin: 0;
        font-size: 14px;
      }
      #resume {
        margin: 0 auto;
        max-width: 900px;
        padding: 0.5em 1em;
        border: none;
      }
      .sectionBlock {
        flex-direction: column;
      }
      .sectionContent {
        width: 100%;
      }
      .sectionContent .date {
        padding-right: 2em;
      }
      .sectionName {
        width: auto;
      }
      .largeFont {
        font-size: 20px;
      }
      .smallFont {
        font-size: 14px;
      }
    }
    
    @media print {
      body {
        background: #FFFFFF;
      }
      #resume {
        margin: 0 auto;
        max-width: 900px;
        padding: 0px 0px;
        border: 0px;
        background: #fff;
        box-shadow: none;
        -webkit-box-shadow: none;
      }
    
      a {
        color: black;
      }
    }
  ''';
}
