from langchain_core.tools import tool
from ..RAG.data_extraction_tools.web_tools import WEB_TavilyClient
from typing import Annotated, List
from deep_translator import GoogleTranslator

@tool
def translator(text: str, target_language: str) -> str:
    """Translate text to target language using Google Translate.
    
    Args:
        text: The text to translate
        target_language: ISO 639-1 language code. Supported codes:
            'af' (Afrikaans), 'sq' (Albanian), 'am' (Amharic), 'ar' (Arabic),
            'hy' (Armenian), 'az' (Azerbaijani), 'eu' (Basque), 'be' (Belarusian),
            'bn' (Bengali), 'bs' (Bosnian), 'bg' (Bulgarian), 'ca' (Catalan),
            'ceb' (Cebuano), 'zh' or 'zh-CN' (Chinese Simplified), 'zh-TW' (Chinese Traditional),
            'co' (Corsican), 'hr' (Croatian), 'cs' (Czech), 'da' (Danish),
            'nl' (Dutch), 'en' (English), 'eo' (Esperanto), 'et' (Estonian),
            'fi' (Finnish), 'fr' (French), 'fy' (Frisian), 'gl' (Galician),
            'ka' (Georgian), 'de' (German), 'el' (Greek), 'gu' (Gujarati),
            'ht' (Haitian Creole), 'ha' (Hausa), 'haw' (Hawaiian), 'he' or 'iw' (Hebrew),
            'hi' (Hindi), 'hmn' (Hmong), 'hu' (Hungarian), 'is' (Icelandic),
            'ig' (Igbo), 'id' (Indonesian), 'ga' (Irish), 'it' (Italian),
            'ja' (Japanese), 'jw' (Javanese), 'kn' (Kannada), 'kk' (Kazakh),
            'km' (Khmer), 'rw' (Kinyarwanda), 'ko' (Korean), 'ku' (Kurdish),
            'ky' (Kyrgyz), 'lo' (Lao), 'la' (Latin), 'lv' (Latvian),
            'lt' (Lithuanian), 'lb' (Luxembourgish), 'mk' (Macedonian), 'mg' (Malagasy),
            'ms' (Malay), 'ml' (Malayalam), 'mt' (Maltese), 'mi' (Maori),
            'mr' (Marathi), 'mn' (Mongolian), 'my' (Myanmar), 'ne' (Nepali),
            'no' (Norwegian), 'ny' (Nyanja), 'or' (Odia), 'ps' (Pashto),
            'fa' (Persian), 'pl' (Polish), 'pt' (Portuguese), 'pa' (Punjabi),
            'ro' (Romanian), 'ru' (Russian), 'sm' (Samoan), 'gd' (Scots Gaelic),
            'sr' (Serbian), 'st' (Sesotho), 'sn' (Shona), 'sd' (Sindhi),
            'si' (Sinhala), 'sk' (Slovak), 'sl' (Slovenian), 'so' (Somali),
            'es' (Spanish), 'su' (Sundanese), 'sw' (Swahili), 'sv' (Swedish),
            'tl' (Tagalog), 'tg' (Tajik), 'ta' (Tamil), 'tt' (Tatar),
            'te' (Telugu), 'th' (Thai), 'tr' (Turkish), 'tk' (Turkmen),
            'uk' (Ukrainian), 'ur' (Urdu), 'ug' (Uyghur), 'uz' (Uzbek),
            'vi' (Vietnamese), 'cy' (Welsh), 'xh' (Xhosa), 'yi' (Yiddish),
            'yo' (Yoruba), 'zu' (Zulu)
    
    Returns:
        Translated text as string
    
    Note: source language and target cannot be the same.
    for example:
      text: I will resopond to the user in english.
      target_language: en
      This is not allowed.
    """
    try:
        return GoogleTranslator(source='auto', target=target_language).translate(text)
    except Exception as e:
        return f"Translation failed: {str(e)}"