# تجهيز تشغيل نوتبوك تدريب مداد (midad_allam_finetune.ipynb)

## ١. تثبيت المكتبات

```bash
pip install -r requirements.txt
```

يفضّل تسوون بيئة افتراضية منفصلة أول (venv أو conda) قبل التثبيت، عشان ما
تتعارض المكتبات مع مشاريع ثانية عندكم:

```bash
python -m venv midad-env
source midad-env/bin/activate   # على ويندوز: midad-env\Scripts\activate
pip install -r requirements.txt
```

## ٢. تثبيت PyTorch (منفصل عن requirements.txt عمداً)

`torch` **ما هو موجود** بملف requirements.txt لأنه يعتمد على كرت الشاشة
(GPU) وإصدار CUDA عند كل شخص، فلازم يثبّت بأمر مخصص له حسب جهازه. روحوا
لهذا الرابط واختاروا إعداداتكم (نظام التشغيل، إصدار CUDA):

https://pytorch.org/get-started/locally/

**على Kaggle أو Google Colab: تجاهلوا هذي الخطوة كلياً** — torch مثبّت
هناك مسبقاً.

## ٣. متطلبات الجهاز (GPU)

- التدريب مبني على QLoRA بصيغة 4-bit، فمحتاجين **GPU** بذاكرة لا تقل عن
  ٨-١٠ جيجابايت. ما يشتغل بشكل عملي على معالج عادي (CPU) فقط.
- لازم تعريفات NVIDIA CUDA مثبّتة ومطابقة لإصدار torch اللي ثبتوه بالخطوة
  السابقة.
- **ما عندكم جهاز بكرت شاشة مناسب؟** أسهل حل تسوون بالضبط زي ما سويت أنا:
  ترفعون الداتا والنوتبوك على **Kaggle** (فيه GPU مجاني T4، فعّلوه من
  Settings → Accelerator) وتشغلونه من هناك بدون أي تجهيز محلي.

## ٤. الوصول لنموذج ALLaM على Hugging Face

لو نموذج `ALLaM-AI/ALLaM-7B-Instruct-preview` يحتاج تسجيل دخول (gated) عند
تحميله، كل واحد منكم يحتاج:
1. حساب على https://huggingface.co
2. طلب الوصول للنموذج من صفحته على Hugging Face (إن كان محتاج موافقة)
3. توكن خاص فيه (من Settings → Access Tokens)، يُستخدم بمتغير `HF_TOKEN`
   داخل النوتبوك (أو عبر Kaggle Secrets لو تشغلونه على Kaggle، كما هو موضّح
   داخل النوتبوك نفسه)

## ٥. ملفات الداتا

تأكدوا إن ملفات `merged_train.jsonl` و`merged_validation.jsonl` و
`merged_test.jsonl` موجودة بنفس المسار اللي محدد بخلية الإعدادات بالنوتبوك
(`DATA_DIR`)، وعدّلوه لو حطيتوها بمكان مختلف.
