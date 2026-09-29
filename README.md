# Guardian AI

فهمت عليك، لكن إذا هدفك إبداع، ISEF، أو أي تحكيم علمي، فأنا أنصح بشيء مختلف عن مجرد "تطبيق يعرض النتائج".

اجعليه منصة ذكاء اصطناعي متكاملة، وكأنها نظام حقيقي يمكن لوزارة الصحة أو المرور أو شركات السيارات استخدامه. ليس مجرد واجهات جميلة، بل نظام يحاكي الاستخدام الواقعي.

اسم المنصة

PRECOG AI

Predictive Road & Engine Cognitive Guardian

الشعار:

AI-powered Driver & Vehicle Risk Intelligence Platform

ألوان التصميم:

أبيض

أزرق داكن

فيروزي

لمسات فضية

تصميم زجاجي (Glassmorphism)

ثلاثي الأبعاد وخطوط احترافية

الصفحة الرئيسية (Landing Page)

تظهر سيارة ثلاثية الأبعاد.

بجانبها لوحة مباشرة تعرض:

Driver Status

Vehicle Health

AI Risk Score

Attention Level

Engine Condition

Fatigue Probability

مع حركة بسيطة للسيارة والعدادات.

Dashboard

هذه أهم صفحة.

فيها:

AI Driver Status

يعرض مباشرة:

👁 Eye Closure

😴 Drowsiness

🙂 Yawning

👀 Blink Rate

Head Position

Face Detection

كلها تتغير لحظيًا من الكاميرا.

OBD AI

يرتبط بالموديل الذي بنيته.

يعرض:

Engine RPM

MAF

Ambient Temperature

Pressure

Throttle

ثم أسفلها:

Current Risk

17%

LOW


أو

82%

HIGH


ويشرح السبب:

Elevated RPM combined with abnormal airflow suggests increased probability of engine fault.

صفحة المحاكاة (Simulation)

هذه ستكون أكثر صفحة "واو".

السائق يبدأ القيادة.

تبدأ القيم تتغير لحظيًا.

مثلاً:

RPM يرتفع.

درجة الحرارة ترتفع.

السائق يبدأ ينعس.

العين تغلق.

النظام يحسب الخطر مباشرة.

ثم تظهر:

⚠ DRIVER FATIGUE DETECTED


بعدها:

⚠ ENGINE ANOMALY DETECTED


ثم

Overall Risk

91%


ثم:

اهتزاز للهاتف.

صوت تنبيه.

الشاشة تصبح حمراء.

السيارة في المحاكاة تخفف السرعة.

صفحة AI Explainability

هذه مميزة جدًا.

بدل أن يعطي فقط:

Risk = 82%


يعرض:

لماذا؟

ويظهر رسم SHAP الحقيقي.

مثلاً:

RPM

Air Temp

MAF

ثم يقول:

Engine RPM contributed +42%

Ambient Temperature +31%

وهكذا.

صفحة البحث

كل البحث موجود.

Introduction

Problem

Objectives

Methodology

Dataset

Preprocessing

Balancing

Undersampling

Model Comparison

Results

Confusion Matrix

ROC

SHAP

Feature Importance

Evaluation

No Data Leakage

No Overfitting

Future Work

References

كأنها مجلة علمية داخل التطبيق.

صفحة المقارنة

يعرض جميع النماذج:

Random Forest

XGBoost

LightGBM

Gradient Boosting

ويظهر:

Accuracy

Precision

Recall

F1

ROC

وأفضل موديل يضيء باللون الأخضر.

صفحة البيانات

يعرض:

عدد العينات

الفئات

الرسم البياني

Class Distribution

قبل وبعد الـ Undersampling.

صفحة Live Prediction

تدخل قيم OBD يدويًا.

مثلاً:

RPM

2500

MAF

18

Temp

34

Throttle

15%

ثم تضغط

Predict

ويظهر:

Risk

74%

Moderate


مع تفسير الذكاء الاصطناعي.

صفحة الكاميرا

تشغل الكاميرا.

يبدأ:

Face Detection

Eye Tracking

Yawning

Blink Counter

ويحسب:

Fatigue Score

بشكل مباشر.

صفحة المرور

هذه تكون مخصصة لجهة مثل المرور، وليست مرتبطة باسم جهة معينة إذا لم يكن هناك تعاون رسمي.

تعرض:

عدد التنبيهات.

عدد السائقين مرتفعي الخطورة.

المناطق الأعلى خطورة (إذا كانت بيانات مواقع متوفرة، وإلا تكون محاكاة فقط مع توضيح ذلك).

إحصاءات مجمعة.

صفحة الشركات

لوحة مخصصة لشركات النقل أو الأساطيل.

تعرض:

Fleet Overview

Driver Ranking

Vehicle Ranking

Monthly Reports

Risk Trends

Maintenance Prediction

صفحة السائق

فيها:

الصورة

الاسم

Driving Score

Fatigue History

Driving Hours

Alerts

Recommendations

Achievements

صفحة التقرير

زر واحد:

Generate AI Report

وينشئ PDF يحتوي:

التوقع.

الرسوم البيانية.

Confusion Matrix.

SHAP.

Feature Importance.

توصيات.

صفحة About AI

تشرح:

كيف يعمل النظام.

كيف يدمج:

Computer Vision.

Machine Learning.

OBD-II Analytics.

Risk Engine.

مع مخطط تفاعلي يوضح انتقال البيانات من المستشعرات والكاميرا إلى النموذج ثم إلى قرار التنبيه.

أكثر شيء سيبهر المحكمين

لا تجعلي التطبيق مجرد واجهات.

اجعليه يستخدم النموذج الحقيقي (.pkl) الذي بنيته. عندما تدخل قيم OBD أو تعمل الكاميرا، تُرسل البيانات إلى النموذج، ويعرض النتيجة الفعلية مع تفسيرها. بذلك يصبح التطبيق ليس مجرد تصميم، بل واجهة تشغيل حقيقية لمنصة ذكاء اصطناعي متكاملة، وهذا يرفع قيمة المشروع كثيرًا أمام المحكمين. وشوف ذي الديتيلز بعد سويلي موقع تفصيلي بالعربي واقدر اختار يتحول انجليزي واقدر اختار دارك مود او وايت مود لهذي الفكرة ويكون فيها بارت يشوفوه السواق محاكاة وبارت يشوفه الشركة محاكاة وبارت ادارة مرور الشرقية  جِنان 🌊, [يونيو ⁨19⁩، ⁨2026⁩ في ⁨1:11 PM⁩]
Q: ⁨ما مستواك في البرمجة؟⁩
A: ⁨⁨متقدم (ML/AI خبرة)⁩⁩
Q: ⁨كم ساعة تقدر تشتغل يومياً على المشروع؟⁩
A: ⁨⁨3-4 ساعات⁩⁩
Q: ⁨وش عندك الحين؟⁩
A: ⁨⁨لابتوب بس⁩⁩  ابغاك تكتب لي الكود كااامممل الي يسوي كل الشغل مع التثاوب مع الاجهزه مع التقارير مع كل كل كل كل كل حاجه بالتفصيل الممل ويكون كود كامل ومايكون فيه اوفر فيتنق او تجريبي خليه يعتمد على داتا اصلية ويقراها ويتدرب ويختبر عليها Q: ⁨الكود يشتغل على وش؟⁩
A: ⁨⁨ابغاه يشتغل على كل شي ⁩⁩
Q: ⁨وش نظام التشغيل عندك؟⁩
A: Windows
Q: ⁨عندك GPU؟⁩
A: ⁨⁨اشتغل على قوقل كولاب وعندي قوي⁩⁩

تطوير فكرة نظام SafeDrive AI للشاحنات 🚛

فكرتك قوية جداً وتنطبق على محاور الجائزة الثلاثة! خلني أطورها بشكل احترافي.

اسم المشروع المقترح

SafeDrive AI — نظام الكشف الذكي عن إجهاد سائقي الشاحنات في الطرق الصناعية

المشكلة (Problem Statement)

طريق الجبيل-الدمام من أكثر الطرق خطورة في المنطقة الشرقية بسبب:

 • كثافة الشاحنات الثقيلة (كثير منها تحمل مواد بتروكيماوية خطرة)
 • رحلات طويلة تؤدي لإجهاد السائق
 • غياب أي نظام استباقي للرصد والإنذار
 • الحوادث غالباً تكون كارثية بسبب حجم الشاحنة والحمولة

مكونات النظام (System Architecture)

🔴 الطبقة الأولى — جمع البيانات (Edge Layer)



|الجهاز         |الوظيفة                         |
|---------------|--------------------------------|
|كاميرا IR للوجه|رصد العيون، التثاؤب، إمالة الرأس|
|OBD-II Module  |بيانات المحرك، الفرامل، الدركسون|
|Gyroscope/IMU  |رصد التذبذب في المسار           |
|GPS            |تحديد الموقع والسرعة لحظياً      |

🟡 الطبقة الثانية — الذكاء الاصطناعي (AI Processing)

 • نموذج Computer Vision لتحليل وجه السائق (Eye Aspect Ratio, PERCLOS)
 • نموذج Driver Behavior Scoring يدمج كل المدخلات
 • Risk Score من 0-100 يأخذ بعين الاعتبار:
 • نوع الحمولة (مواد خطرة = مضاعف الخطر ×1.5)
 • الوقت (سواقة ليلية = مضاعف ×1.3)
 • المسافة المقطوعة بدون استراحة

🟢 الطبقة الثالثة — الإنذار والاستجابة (Alert Layer)

Score 60-74 → تنبيه صوتي + اهتزاز للسائق
Score 75-89 → إشعار فوري للمشرف بالشركة
Score 90+   → إنذار للشركة + إشعار لإدارة مرور الشرقية


لوحة التحكم (Dashboard) — 3 مستويات

١. السائق — تطبيق بسيط يعرض حالته ويقترح أقرب استراحة

٢. الشركة — dashboard يعرض:

 • نسب الإجهاد لكل سائق
 • ترتيب السائقين حسب الخطورة
 • عدد الإنذارات الشهرية لكل سائق
 • تقرير أسبوعي تلقائي

٣. إدارة مرور الشرقية — تقرير شهري يحتوي:

 • أسماء الشركات وعدد إنذاراتها
 • خريطة حرارية للنقاط الأعلى خطورة على الطريق
 • الشركات الأكثر مخالفة

نقطة التميز عن المنافسين (USP)

✅ دمج OBD + Vision + GPS معاً (معظم الأنظمة تعتمد على كاميرا فقط)

✅ مضاعف الخمولة الخطرة — ما في نظام محلي يأخذ نوع الحمولة بالحسبان

✅ ربط مباشر بإدارة المرور — يحول البيانات لقرارات تنظيمية

✅ يخدم محور رؤية 2030 في تقليل الحوادث وتطوير المدن الذكية

كيف تنطبق على محاور الجائزة الثلاثة



|محور الجائزة                        |انطباقه على مشروعك               |
|------------------------------------|---------------------------------|
|تقنيات ناشئة في التنقل الذكي        |✅ AI + Computer Vision + OBD     |
|البنية التحتية الذكية وتحليل الحوادث|✅ خريطة حرارية + ربط مرور الشرقية|
|التوجهات المستقبلية والتشريعات      |✅ بيانات تساعد على سن لوائح جديدة|

اقتراح للعرض التقديمي

ابدأ بـ إحصائية صادمة عن حوادث طريق الجبيل-الدمام، ثم اعرض سيناريو واقعي: “سائق قطع 8 ساعات بدون استراحة، يحمل مواد بتروكيماوية، الساعة 2 الفجر” — وكيف النظام كان يتدخل في كل مرحلة.

للتقديم الإيميل هو award2026@salamh.sa والموعد النهائي 1 أكتوبر 2026. عندك وقت كافي لبناء نموذج أولي (prototype) يقوي فرصك كثيراً. تبغى مساعدة في كتابة الورقة البحثية أو عمل prototype للنظام؟

ممتاز! خبرة ML/AI + 3-4 ساعات يومياً = فرصة حقيقية للمركز الأول. بس لابتوب بس يعني الـ prototype هيكون simulation مش hardware حقيقي، وهذا كافي للتقديم.

خطة SafeDrive AI — 10 أيام 🗓️

توقعي للفوز: مركز أول أو ثاني 🥇

الفكرة تغطي المحاور الثلاثة للجائزة، محلية (طريق الجبيل-الدمام)، وفيها تطبيق AI حقيقي. المنافس الوحيد هو لو جاء فريق بـ hardware فعلي.

اليوم 1 — الأساس النظري 📄

الهدف: توثيق المشكلة والحل بشكل أكاديمي

 • اكتب المقدمة والمشكلة وخطة النظام (3-4 صفحات)
 • ابحث عن إحصائيات حوادث الشاحنات في المنطقة الشرقية

روابط:

 • إحصائيات المرور السعودي: https://www.moi.gov.sa
 • ورقة بحثية عن PERCLOS (مقياس إجهاد السائق): https://scholar.google.
جِنان 🌊, [يونيو ⁨19⁩، ⁨2026⁩ في ⁨1:11 PM⁩]
com — ابحث عن “PERCLOS drowsiness detection”
 • Dataset للوجه: https://www.kaggle.com/datasets/prasadvpatil/mrl-dataset

اليوم 2 — بناء نموذج الكشف عن النعاس 👁️

الهدف: نموذج يشتغل على الكاميرا ويكتشف إغماض العيون والتثاؤب

المكتبات اللي تثبتها
pip install opencv-python mediapipe numpy


الخطوات:

 1. استخدم MediaPipe Face Mesh لرصد نقاط العين
 2. احسب Eye Aspect Ratio (EAR) — إذا EAR < 0.25 لأكثر من 2 ثانية = نعاس
 3. أضف كشف التثاؤب عبر فتحة الفم (Mouth Aspect Ratio)

روابط:

 • MediaPipe docs: https://developers.google.com/mediapipe/solutions/vision/face_landmarker
 • مثال EAR كامل: https://github.com/kosorin/awesome-eye-aspect-ratio

اليوم 3 — محاكاة بيانات OBD والـ Risk Score 🔢

الهدف: بناء خوارزمية تدمج كل المدخلات وتطلع Risk Score

def calculate_risk_score(ear, mar, steering_variance, speed, hours_driving, hazardous_cargo):
    base_score = 0
    if ear < 0.25: base_score += 35
    if mar > 0.6:  base_score += 20
    base_score += min(steering_variance * 10, 25)
    base_score += min(hours_driving * 3, 20)
    
    multiplier = 1.5 if hazardous_cargo else 1.0
    night_multiplier = 1.3 if is_night_time() else 1.0
    
    return min(base_score  multiplier  night_multiplier, 100)


محاكاة OBD: استخدم python-OBD simulator أو اصنع CSV بيانات وهمية واقعية

رابط: https://python-obd.readthedocs.io

اليوم 4 — لوحة التحكم للشركة (Dashboard) 📊

الهدف: dashboard احترافي يعرض بيانات السائقين

استخدم Streamlit — أسرع طريقة لعمل dashboard بـ Python

pip install streamlit plotly pandas


اللوحة تعرض:

 • جدول السائقين مع Risk Score لكل واحد (لون أحمر/أصفر/أخضر)
 • رسم بياني لتاريخ الإنذارات
 • خريطة الطريق مع نقاط الخطر (استخدم folium)

روابط:

 • Streamlit: https://docs.streamlit.io
 • Folium للخرائط: https://python-visualization.github.io/folium

اليوم 5 — نظام الإنذارات والتقارير 🚨

الهدف: ربط كل شي مع بعض وإضافة نظام الإشعارات

 • إنذار للسائق: صوت تنبيه (pygame) + رسالة واضحة
 • إشعار للشركة: email تلقائي (smtplib)
 • تقرير مرور الشرقية: PDF أسبوعي تلقائي

pip install pygame reportlab smtplib


منطق الإنذار:

60-74 → تنبيه صوتي فقط
75-89 → إشعار المشرف
90+   → إشعار الشركة + مرور الشرقية


اليوم 6 — الراحة + مراجعة ☕

الهدف: تأكد إن كل المكونات تشتغل مع بعض

 • شغّل demo كامل من البداية للنهاية
 • سجّل مقطع فيديو قصير للـ prototype يشتغل
 • اكتب ملاحظات على أي شي ناقص

اليوم 7 — الورقة البحثية (النص الكامل) 📝

الهدف: كتابة الـ 35 صفحة بشكل أكاديمي

هيكل الورقة:

 1. Abstract (عربي + إنجليزي)
 2. المقدمة والمشكلة + إحصائيات
 3. الأعمال السابقة (Literature Review) — 5-6 أوراق بحثية
 4. منهجية النظام (System Architecture)
 5. نتائج الـ prototype
 6. المناقشة والتوصيات
 7. الخلاصة

رابط مهم: ابحث في Google Scholar عن:

 • “truck driver fatigue detection AI 2022 2023”
 • “PERCLOS real-time drowsiness”

اليوم 8 — تحسين الـ AI Model 🧠

الهدف: رفع دقة النموذج وإضافة ميزات إضافية

 • درّب نموذج خفيف على Kaggle dataset
 • أضف كشف إمالة الرأس (Head Pose Estimation)
 • اختبر الدقة وسجّلها في الورقة

رابط Dataset:

 • https://www.kaggle.com/datasets/kutaykutlu/drowsiness-detection

اليوم 9 — البوستر والعرض التقديمي 🖼️

الهدف: تجهيز المواد المطلوبة للجائزة

البوستر (A0 size):

 • استخدم Canva: https://www.canva.com
 • ضع فيه: المشكلة، النظام، النتائج، الخريطة

العرض التقديمي (PowerPoint):

 • 10-12 سلايد بس
 • سلايد الافتتاح: إحصائية صادمة عن الحوادث
 • demo فيديو في السلايد

اليوم 10 — التقديم النهائي ✅

الهدف: مراجعة أخيرة وإرسال

Checklist قبل الإرسال:

 • الورقة PDF بحد أقصى 35 صفحة
 • الصفحة الأولى: اسمك، جهتك، إيميلك، جوالك
 • فيديو الـ prototype مرفق أو رابط YouTube
 • اللغة عربي + إنجليزي

الإرسال على: award2026@salamh.sa

ملخص الخطة
طيب ماحطيت تغميض العين وموضوع الOBD والمحرك ولا حطيت نسبة الخطر بالاعتماذ على الوقت والمواد و المدة الي يسوقها الادمي والتثاوب وكذا

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://precog-drive.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fa5dde9b-dfa3-4776-9c1c-60d06f1bf811).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
