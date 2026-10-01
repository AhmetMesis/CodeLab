import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Kategorileri oluştur
  const react = await prisma.category.create({
    data: {
      name: 'React',
      slug: 'react',
      description: 'Modern kullanıcı arayüzleri oluşturmak için en popüler JavaScript kütüphanesi.',
      icon: '⚛️',
    },
  });

  const nextjs = await prisma.category.create({
    data: {
      name: 'Next.js',
      slug: 'nextjs',
      description: 'React tabanlı full-stack web framework. SEO, routing ve sunucu tarafı render.',
      icon: '▲',
    },
  });

  const nestjs = await prisma.category.create({
    data: {
      name: 'NestJS',
      slug: 'nestjs',
      description: 'TypeScript ile ölçeklenebilir sunucu tarafı (backend) uygulamaları geliştirmek için framework.',
      icon: '🐈',
    },
  });

  // ========== REACT KONULARI ==========

  const useStateTopic = await prisma.topic.create({
    data: {
      categoryId: react.id,
      title: 'useState Hook',
      description: 'React bileşenlerinde durum (state) yönetiminin temeli.',
      difficulty: 'easy',
      order: 1,
      content: `# useState Hook Nedir?

\`useState\` React'te bir bileşenin **durumunu (state)** yönetmek için kullanılan en temel Hook'tur.

## Ne İşe Yarar?
Bir bileşenin ekranda gösterdiği veriyi değiştirmek istediğinde \`useState\` kullanırsın. Örneğin bir sayacın değerini artırmak, bir formun giriş değerini tutmak veya bir modal'ın açık/kapalı olduğunu takip etmek gibi.

## Nasıl Çalışır?
\`useState\` sana iki şey verir:
1. **Mevcut değer** (state): Verinin şu anki hali
2. **Güncelleyici fonksiyon** (setState): Bu değeri değiştirmek için kullandığın fonksiyon

Değeri doğrudan değiştiremezsin (\`count = 5\` yapmazsın). Her zaman güncelleyici fonksiyonu kullanırsın (\`setCount(5)\`). Bu sayede React ekranı yeniden çizer (re-render).`,
      codeExample: `import { useState } from 'react';

function Sayac() {
  // count: mevcut değer (başlangıçta 0)
  // setCount: bu değeri güncelleyen fonksiyon
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Sayaç: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
      <button onClick={() => setCount(0)}>
        Sıfırla
      </button>
    </div>
  );
}`,
      codeExplanation: `• Satır 4: \`useState(0)\` → Başlangıç değeri 0 olan bir state oluşturur. \`count\` değişkeni bu değeri tutar, \`setCount\` ise onu günceller.
• Satır 8: \`{count}\` → JSX içinde süslü parantezle JavaScript değişkeni gösteriyoruz.
• Satır 9: \`onClick={() => setCount(count + 1)}\` → Butona tıklayınca count'u 1 artırır ve React bileşeni yeniden çizer.
• Satır 12: \`setCount(0)\` → Sayacı sıfıra döndürür.`,
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        topicId: useStateTopic.id,
        question: 'Aşağıdaki kodda butona 3 kez tıklandığında ekranda ne görünür?',
        codeSnippet: `const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Tıkla
</button>
<p>Değer: {count}</p>`,
        optionA: 'Değer: 0',
        optionB: 'Değer: 3',
        optionC: 'Değer: 1',
        optionD: 'Hata verir',
        correctIndex: 1,
        explanation: 'Her tıklamada setCount(count + 1) çağrılır. 0→1→2→3. Butona 3 kez tıklandığında count değeri 3 olur ve ekranda "Değer: 3" görünür.',
      },
      {
        topicId: useStateTopic.id,
        question: 'useState kullanırken aşağıdakilerden hangisi YANLIŞTIR?',
        codeSnippet: '',
        optionA: 'useState her zaman bileşenin en üstünde çağrılmalıdır',
        optionB: 'State değerini doğrudan değiştirmek yerine setter fonksiyonunu kullanmalısın',
        optionC: 'count = 5 yazarak state değerini güncelleyebilirsin',
        optionD: 'useState bir dizi döndürür: [değer, güncelleyiciFonksiyon]',
        correctIndex: 2,
        explanation: 'React\'te state değerini doğrudan değiştiremezsin (count = 5 yapamazsın). Bu, React\'in değişikliği fark edememesine ve ekranı yeniden çizememesine neden olur. Her zaman setter fonksiyonunu (setCount) kullanmalısın.',
      },
      {
        topicId: useStateTopic.id,
        question: 'Bu kodun çıktısı ne olur?',
        codeSnippet: `const [name, setName] = useState("Ali");
setName("Veli");
console.log(name);`,
        optionA: '"Veli"',
        optionB: '"Ali"',
        optionC: 'undefined',
        optionD: 'Hata verir',
        correctIndex: 1,
        explanation: 'setState çağrısı asenkrondur — yani hemen güncellenmez. setName("Veli") çağrıldıktan sonra bile, o render döngüsünde name hâlâ "Ali" dir. Yeni değer ancak bir sonraki render\'da geçerli olur.',
      },
    ],
  });

  const useEffectTopic = await prisma.topic.create({
    data: {
      categoryId: react.id,
      title: 'useEffect Hook',
      description: 'Yan etkileri (side effects) yönetmek: API çağrıları, abonelikler, zamanlayıcılar.',
      difficulty: 'medium',
      order: 2,
      content: `# useEffect Hook Nedir?

\`useEffect\` bir bileşenin **yan etkilerini (side effects)** yönetmek için kullanılır.

## Yan Etki (Side Effect) Nedir?
Bileşenin render edilmesiyle doğrudan ilgili olmayan her işlem bir yan etkidir:
- API'den veri çekmek (fetch)
- Bir zamanlayıcı (setInterval) başlatmak
- document.title'ı değiştirmek
- Event listener eklemek

## Bağımlılık Dizisi (Dependency Array)
useEffect'in ikinci parametresi olan dizi, bu efektin **ne zaman çalışacağını** belirler:
- **Dizi yok** → Her render'da çalışır (tehlikeli!)
- **Boş dizi \`[]\`** → Sadece ilk render'da çalışır (componentDidMount gibi)
- **Değerli dizi \`[count]\`** → count değiştiğinde çalışır`,
      codeExample: `import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'den kullanıcı verisini çek
    fetch('https://api.example.com/user/1')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []); // Boş dizi: sadece ilk render'da çalışır

  if (loading) return <p>Yükleniyor...</p>;
  return <h1>Merhaba, {user.name}!</h1>;
}`,
      codeExplanation: `• Satır 4-5: İki ayrı state: kullanıcı verisi (başta null) ve yüklenme durumu (başta true).
• Satır 7-14: useEffect içinde API çağrısı yapılıyor. Veri gelince state güncelleniyor.
• Satır 15: Boş bağımlılık dizisi \`[]\` → Bu efekt sadece bileşen ilk kez ekrana geldiğinde çalışır. Eğer bu diziyi koymazsak, her render'da API çağrısı tekrarlanır (sonsuz döngü!).
• Satır 17-18: Yüklenme durumuna göre koşullu render (conditional rendering).`,
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        topicId: useEffectTopic.id,
        question: 'Aşağıdaki useEffect neden sonsuz döngüye girer?',
        codeSnippet: `const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
});`,
        optionA: 'useState yanlış kullanılmış',
        optionB: 'Bağımlılık dizisi (dependency array) eksik, her render\'da tekrar çalışıyor',
        optionC: 'setCount fonksiyonu hatalı',
        optionD: 'useEffect içinde state güncellenemez',
        correctIndex: 1,
        explanation: 'Bağımlılık dizisi verilmediğinde useEffect HER render\'dan sonra çalışır. setCount state\'i günceller → yeni render tetiklenir → useEffect tekrar çalışır → setCount tekrar çağrılır... Bu sonsuz döngüdür. Çözüm: useEffect(() => { ... }, []) şeklinde boş dizi eklemektir.',
      },
      {
        topicId: useEffectTopic.id,
        question: 'useEffect\'in cleanup (temizlik) fonksiyonu ne zaman çalışır?',
        codeSnippet: `useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(timer);
}, []);`,
        optionA: 'Bileşen ilk render edildiğinde',
        optionB: 'Her saniye',
        optionC: 'Bileşen ekrandan kaldırıldığında (unmount)',
        optionD: 'Hiçbir zaman çalışmaz',
        correctIndex: 2,
        explanation: 'useEffect içinden döndürülen fonksiyon bir "cleanup" (temizlik) fonksiyonudur. Bu fonksiyon, bileşen ekrandan kaldırıldığında (unmount) çalışır. Burada setInterval ile başlatılan zamanlayıcı, bileşen kaldırılınca clearInterval ile temizleniyor. Bu, bellek sızıntısını (memory leak) önler.',
      },
    ],
  });

  const propsStateTopic = await prisma.topic.create({
    data: {
      categoryId: react.id,
      title: 'Props ve State Farkı',
      description: 'Bileşenler arası veri aktarımı ve iç durum yönetimi arasındaki fark.',
      difficulty: 'easy',
      order: 3,
      content: `# Props ve State Nedir?

React'te veri yönetiminin iki temel taşı **Props** ve **State**'tir.

## Props (Properties)
- Bir bileşene **dışarıdan** verilen verilerdir.
- **Salt okunurdur** (read-only): Bileşen kendi props'unu değiştiremez.
- Ebeveyn (parent) bileşen tarafından belirlenir.
- Fonksiyon parametreleri gibi düşün.

## State
- Bileşenin **kendi içinde** tuttuğu verilerdir.
- **Değiştirilebilir**: useState ile güncellenebilir.
- Bileşenin kendisi tarafından yönetilir.
- Değiştiğinde bileşen yeniden render edilir.

## Altın Kural
> Props aşağı akar (parent → child), State bileşenin içinde yaşar.`,
      codeExample: `// PARENT bileşen
function App() {
  const [message, setMessage] = useState("Merhaba!");

  return <GreetingCard text={message} />;
}

// CHILD bileşen
function GreetingCard({ text }) {
  // text bir PROP'tur - dışarıdan gelir, değiştiremeyiz
  const [likes, setLikes] = useState(0);
  // likes bir STATE'tir - bileşenin kendi iç verisi

  return (
    <div>
      <p>{text}</p>
      <button onClick={() => setLikes(likes + 1)}>
        ❤️ {likes}
      </button>
    </div>
  );
}`,
      codeExplanation: `• Satır 3: App bileşeninde "message" adlı bir state tanımlanıyor.
• Satır 5: Bu state, GreetingCard bileşenine "text" adlı bir PROP olarak aktarılıyor.
• Satır 10: GreetingCard, text prop'unu alıyor ama onu DEĞİŞTİREMEZ (read-only).
• Satır 11: GreetingCard'ın kendi state'i: "likes". Bunu sadece kendisi yönetir.
• Satır 18: Butona tıklandığında likes state'i güncellenir — ama text prop'u aynı kalır.`,
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        topicId: propsStateTopic.id,
        question: 'Aşağıdakilerden hangisi Props için DOĞRUDUR?',
        codeSnippet: '',
        optionA: 'Props sadece string tipinde olabilir',
        optionB: 'Props bileşen içinden değiştirilebilir',
        optionC: 'Props ebeveyn bileşenden çocuk bileşene aktarılır ve salt okunurdur',
        optionD: 'Props sadece class bileşenlerde kullanılabilir',
        correctIndex: 2,
        explanation: 'Props, parent bileşenden child bileşene aktarılan ve child tarafından DEĞİŞTİRİLEMEYEN verilerdir. Her tipte (string, number, object, function) olabilir ve hem class hem functional bileşenlerde kullanılır.',
      },
      {
        topicId: propsStateTopic.id,
        question: 'Bu kodda "Merhaba" butonuna tıklanırsa ne olur?',
        codeSnippet: `function Child({ name }) {
  return (
    <button onClick={() => name = "Veli"}>
      Merhaba {name}
    </button>
  );
}

<Child name="Ali" />`,
        optionA: 'Ekranda "Merhaba Veli" yazar',
        optionB: 'Hiçbir şey değişmez, props değiştirilemez',
        optionC: 'Sayfa yenilenir',
        optionD: 'React uyarı verir ve bileşen silinir',
        correctIndex: 1,
        explanation: 'Props salt okunurdur (read-only). name = "Veli" ataması JavaScript\'te çalışabilir gibi görünse de React bu değişikliği fark etmez ve ekranı yeniden çizmez. Props\'u değiştirmenin doğru yolu, parent bileşendeki state\'i güncellemektir.',
      },
    ],
  });

  // ========== NEXT.JS KONULARI ==========

  const appRouterTopic = await prisma.topic.create({
    data: {
      categoryId: nextjs.id,
      title: 'App Router ve Dosya Tabanlı Routing',
      description: 'Next.js 13+ ile gelen yeni routing sistemi ve klasör yapısı.',
      difficulty: 'easy',
      order: 1,
      content: `# App Router Nedir?

Next.js'in en güçlü özelliklerinden biri **dosya tabanlı routing** sistemidir. React'te \`react-router\` gibi bir paket kurup route tanımlarsın, ama Next.js'te **klasör oluşturmak = sayfa oluşturmak** demektir.

## Nasıl Çalışır?
\`app/\` klasörünün içindeki her klasör bir URL yoluna karşılık gelir:

| Klasör Yapısı | URL |
|---|---|
| \`app/page.tsx\` | \`/\` |
| \`app/about/page.tsx\` | \`/about\` |
| \`app/blog/[slug]/page.tsx\` | \`/blog/herhangi-bir-sey\` |

## Özel Dosyalar
- \`page.tsx\` → Sayfanın içeriği
- \`layout.tsx\` → Sayfayı saran iskelet (navbar, footer vs.)
- \`loading.tsx\` → Sayfa yüklenirken gösterilen UI
- \`error.tsx\` → Hata durumunda gösterilen UI`,
      codeExample: `// app/page.tsx → Ana sayfa (/)
export default function Home() {
  return <h1>Ana Sayfa</h1>;
}

// app/about/page.tsx → /about sayfası
export default function About() {
  return <h1>Hakkımızda</h1>;
}

// app/blog/[slug]/page.tsx → Dinamik route
// /blog/react-nedir, /blog/nextjs-rehberi vs.
export default function BlogPost({ params }) {
  return <h1>Blog Yazısı: {params.slug}</h1>;
}`,
      codeExplanation: `• İlk bileşen: app/page.tsx dosyası otomatik olarak "/" (kök) URL'ine eşlenir.
• İkinci bileşen: app/about/ klasörü içindeki page.tsx, "/about" URL'ine eşlenir.
• Üçüncü bileşen: [slug] köşeli parantezli klasör DİNAMİK route oluşturur. URL'deki değer params.slug ile okunur. Örneğin /blog/merhaba → params.slug = "merhaba".`,
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        topicId: appRouterTopic.id,
        question: 'app/products/[id]/page.tsx dosyası hangi URL\'e karşılık gelir?',
        codeSnippet: '',
        optionA: '/products/id',
        optionB: '/products/[id]',
        optionC: '/products/42 (herhangi bir değer)',
        optionD: '/products',
        correctIndex: 2,
        explanation: '[id] köşeli parantez içindeki isim dinamik bir parametredir. Bu dosya /products/1, /products/42, /products/abc gibi herhangi bir değerle eşleşir. Değere params.id ile erişirsin.',
      },
      {
        topicId: appRouterTopic.id,
        question: 'Next.js App Router\'da layout.tsx dosyasının görevi nedir?',
        codeSnippet: '',
        optionA: 'Sadece CSS stillerini tanımlar',
        optionB: 'Sayfaları saran ortak iskelet yapısıdır (navbar, footer vb.)',
        optionC: 'API route tanımlamak için kullanılır',
        optionD: 'Veritabanı bağlantısını yönetir',
        correctIndex: 1,
        explanation: 'layout.tsx, alt sayfalara sarmalayan (wrap eden) bir bileşendir. Navbar, sidebar, footer gibi her sayfada tekrar eden yapıları buraya koyarsın. Children prop\'u ile iç sayfa içeriği otomatik olarak yerleştirilir.',
      },
    ],
  });

  const serverClientTopic = await prisma.topic.create({
    data: {
      categoryId: nextjs.id,
      title: 'Server vs Client Components',
      description: 'Hangi bileşen sunucuda, hangisi tarayıcıda çalışır? Ne zaman hangisini kullanmalısın?',
      difficulty: 'medium',
      order: 2,
      content: `# Server ve Client Components

Next.js 13+ ile bileşenler iki kategoriye ayrılır:

## Server Components (Varsayılan)
- **Sunucuda** çalışır, tarayıcıya sadece HTML gönderilir.
- Doğrudan veritabanına erişebilir, API key gibi hassas verileri kullanabilir.
- useState, useEffect gibi Hook'lar KULLANILAMAZ.
- onClick gibi event handler'lar KULLANILAMAZ.

## Client Components
- Dosyanın en üstüne \`'use client'\` yazılarak tanımlanır.
- **Tarayıcıda** çalışır.
- useState, useEffect, onClick gibi interaktif özellikler kullanılabilir.
- Veritabanına doğrudan erişemez.

## Ne Zaman Hangisi?
| İhtiyaç | Tercih |
|---|---|
| Veritabanı sorgusu | Server Component |
| Buton tıklama, form | Client Component |
| SEO önemli statik içerik | Server Component |
| Animasyon, interaktivite | Client Component |`,
      codeExample: `// Bu bir SERVER Component (varsayılan)
// Dosyanın başında 'use client' YOK
async function UserList() {
  // Sunucuda çalışır - doğrudan DB sorgusu yapabilirsin!
  const users = await db.user.findMany();
  
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// Bu bir CLIENT Component
'use client';
import { useState } from 'react';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}`,
      codeExplanation: `• UserList: Başında 'use client' yok → Server Component. Sunucuda çalışır, doğrudan veritabanı sorgusu yapabilir. Ama useState veya onClick KULLANILAMAZ.
• LikeButton: Başında 'use client' var → Client Component. Tarayıcıda çalışır, useState ve onClick kullanabilir. Ama doğrudan veritabanına erişemez.
• Strateji: Veriyi Server Component'te çek, interaktif kısımları Client Component'e taşı.`,
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        topicId: serverClientTopic.id,
        question: 'Aşağıdaki kodda hata nerededir?',
        codeSnippet: `// app/dashboard/page.tsx
import { useState } from 'react';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count+1)}>{count}</button>;
}`,
        optionA: 'useState yanlış import edilmiş',
        optionB: 'Dosyanın başına "use client" eklenmemiş, Server Component\'te useState kullanılamaz',
        optionC: 'onClick fonksiyonu hatalı yazılmış',
        optionD: 'export default yanlış kullanılmış',
        correctIndex: 1,
        explanation: 'Next.js App Router\'da tüm bileşenler varsayılan olarak Server Component\'tir. useState gibi React Hook\'ları yalnızca Client Component\'lerde kullanılabilir. Çözüm: Dosyanın en üstüne \'use client\' direktifini eklemektir.',
      },
    ],
  });

  // ========== NESTJS KONULARI ==========

  const controllersTopic = await prisma.topic.create({
    data: {
      categoryId: nestjs.id,
      title: 'Controllers ve Route Yapısı',
      description: 'HTTP isteklerini karşılayan ve yanıt döndüren yapılar.',
      difficulty: 'easy',
      order: 1,
      content: `# Controller Nedir?

NestJS'te **Controller**, gelen HTTP isteklerini (request) karşılayan ve istemciye yanıt (response) döndüren sınıftır.

## Temel Kavramlar
- \`@Controller('users')\` → Bu controller'ın tüm route'ları \`/users\` ile başlar.
- \`@Get()\` → GET isteği
- \`@Post()\` → POST isteği  
- \`@Param()\` → URL parametresi (örn: /users/5 → id=5)
- \`@Body()\` → İstek gövdesi (POST ile gönderilen veri)

## Akış
İstemci (tarayıcı/frontend) → HTTP İsteği → Controller → Service → Veritabanı → Yanıt`,
      codeExample: `import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  findAll() {
    // GET /users → Tüm kullanıcıları getir
    return [{ id: 1, name: 'Ali' }, { id: 2, name: 'Veli' }];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // GET /users/1 → ID'si 1 olan kullanıcıyı getir
    return { id: +id, name: 'Ali' };
  }

  @Post()
  create(@Body() body: { name: string }) {
    // POST /users → Yeni kullanıcı oluştur
    return { id: 3, name: body.name };
  }
}`,
      codeExplanation: `• Satır 3: @Controller('users') → Bu sınıftaki tüm route'ların önüne "/users" eklenir.
• Satır 6-9: @Get() → GET /users isteğini karşılar. Parametre yok, tüm listeyi döndürür.
• Satır 12-15: @Get(':id') → GET /users/1 gibi istekleri karşılar. :id kısmı dinamik parametredir, @Param('id') ile alınır.
• Satır 18-21: @Post() → POST /users isteğini karşılar. @Body() ile gönderilen JSON verisini alır.`,
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        topicId: controllersTopic.id,
        question: 'GET /products/42 isteğini karşılamak için hangi decorator kombinasyonu kullanılır?',
        codeSnippet: '',
        optionA: '@Controller("products") ve @Get("42")',
        optionB: '@Controller("products") ve @Get(":id") + @Param("id")',
        optionC: '@Controller("products/42") ve @Get()',
        optionD: '@Get("products/42")',
        correctIndex: 1,
        explanation: '@Controller("products") tüm route\'ları /products altına toplar. @Get(":id") dinamik parametre tanımlar. @Param("id") ile URL\'deki 42 değerine erişirsin. Bu NestJS\'in standart route tanımlama yöntemidir.',
      },
      {
        topicId: controllersTopic.id,
        question: 'Aşağıdaki controller\'da POST /items isteği atıldığında ne döner?',
        codeSnippet: `@Controller('items')
export class ItemsController {
  @Post()
  create(@Body() body: { title: string }) {
    return { message: 'Oluşturuldu', title: body.title };
  }
}`,
        optionA: 'Hata verir çünkü return yerine res.send() kullanılmalı',
        optionB: '{ message: "Oluşturuldu", title: <gönderilen title değeri> }',
        optionC: 'undefined',
        optionD: 'Sadece HTTP 201 kodu, body boş döner',
        correctIndex: 1,
        explanation: 'NestJS\'te controller metotlarından döndürülen değer otomatik olarak JSON yanıta dönüştürülür. Express\'teki gibi res.send() veya res.json() kullanmana gerek yoktur. @Body() ile gelen veriden title alınır ve yanıtta kullanılır.',
      },
    ],
  });

  const diTopic = await prisma.topic.create({
    data: {
      categoryId: nestjs.id,
      title: 'Dependency Injection (DI)',
      description: 'NestJS\'in kalbi: Bağımlılıkların otomatik olarak enjekte edilmesi.',
      difficulty: 'medium',
      order: 2,
      content: `# Dependency Injection Nedir?

**Dependency Injection (DI)**, bir sınıfın ihtiyaç duyduğu bağımlılıkları kendi oluşturmak yerine **dışarıdan alması** prensibidir.

## Neden Önemli?
DI olmadan:
\`\`\`
class UsersController {
  private service = new UsersService(); // ❌ Sıkı bağımlılık
}
\`\`\`

DI ile:
\`\`\`
class UsersController {
  constructor(private service: UsersService) {} // ✅ Gevşek bağımlılık
}
\`\`\`

## NestJS'te Nasıl Çalışır?
1. Service'i \`@Injectable()\` ile işaretle
2. Module'ün \`providers\` dizisine ekle
3. Controller'ın constructor'ına yaz → NestJS otomatik enjekte eder

Bu sayede test yazarken sahte (mock) service verebilirsin, kodun esnek ve test edilebilir olur.`,
      codeExample: `// users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Veli' },
  ];

  findAll() {
    return this.users;
  }
}

// users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // NestJS, UsersService'i otomatik enjekte eder
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}`,
      codeExplanation: `• Satır 4: @Injectable() → Bu sınıfın NestJS'in DI sistemi tarafından yönetilebileceğini belirtir.
• Satır 23: Constructor'da private readonly usersService: UsersService → NestJS bu parametreyi görünce otomatik olarak UsersService'in bir örneğini (instance) oluşturup buraya enjekte eder.
• Controller, Service'i new ile oluşturmuyor — NestJS bunu hallediyor. Bu sayede kodlar birbirine gevşek bağlı (loosely coupled) kalıyor.`,
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        topicId: diTopic.id,
        question: 'Dependency Injection\'ın en büyük avantajı nedir?',
        codeSnippet: '',
        optionA: 'Uygulamayı daha hızlı çalıştırır',
        optionB: 'Kodun test edilebilirliğini ve esnekliğini artırır',
        optionC: 'Veritabanı bağlantısını otomatik kurar',
        optionD: 'Frontend ile backend\'i birbirine bağlar',
        correctIndex: 1,
        explanation: 'DI sayesinde bağımlılıklar dışarıdan verildiği için test yazarken gerçek servis yerine sahte (mock) bir servis enjekte edebilirsin. Ayrıca servisi değiştirmek istediğinde sadece module\'deki provider\'ı değiştirmen yeterlidir — controller koduna dokunmazsın.',
      },
      {
        topicId: diTopic.id,
        question: 'NestJS\'te bir service\'i Injectable yapmak için ne yapmalısın?',
        codeSnippet: '',
        optionA: 'Service dosyasının adını .injectable.ts olarak değiştirmek',
        optionB: 'Sınıfın üstüne @Injectable() decorator\'ını eklemek ve module\'ün providers dizisine eklemek',
        optionC: 'constructor içinde this.injectable = true yazmak',
        optionD: 'package.json\'a injectable: true eklemek',
        correctIndex: 1,
        explanation: 'İki adım gereklidir: (1) Sınıfın üstüne @Injectable() decorator\'ını eklemek ve (2) ilgili module\'ün @Module({ providers: [Service] }) dizisine eklemek. Bu sayede NestJS o sınıfı DI sistemi ile yönetir.',
      },
    ],
  });

  console.log('✅ Seed verileri başarıyla eklendi!');
  console.log(`   📂 ${3} Kategori`);
  console.log(`   📚 ${6} Konu`);
  console.log(`   🧠 ${13} Quiz Sorusu`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
