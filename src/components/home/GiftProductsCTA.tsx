'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '@/styles/theme';
import { fadeIn, fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils';
import { FaWhatsapp, FaGift, FaRegImage, FaMagnet, FaMugHot, FaPuzzlePiece } from 'react-icons/fa';

const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: center;
  animation: ${fadeIn} 0.6s ease;

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`;

const TextSide = styled.div``;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  border: 1px solid ${theme.colors.secondary}40;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.md};
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text};
  line-height: 1.2;
  margin-bottom: ${theme.spacing.md};

  span { color: ${theme.colors.secondary}; }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.lg};

  a {
    color: ${theme.colors.secondary};
    text-decoration: none;
    border-bottom: 1px solid ${theme.colors.secondary}50;

    &:hover { border-bottom-color: ${theme.colors.secondary}; }
  }
`;

const CTAs = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(Link)<{ $delay: string }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.glassBg};
  border: 1px solid ${theme.colors.glassBorder};
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay};
  opacity: 0;

  &:hover {
    border-color: ${theme.colors.secondary}40;
    transform: translateY(-3px);
  }
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 4px;
`;

const CardName = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text};
  margin: 0;
`;

const CardPrice = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  color: ${theme.colors.secondary};

  span {
    font-size: ${theme.fontSizes.xs};
    font-weight: 400;
    color: ${theme.colors.textSecondary};
  }
`;

const CardNote = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

/**
 * The gift and print cluster is the shop's widest market, but until now the
 * home page only reached it through one icon in the services grid and a
 * product rail that needs a photo per item. These four are the ones the shop
 * actually makes money on, with the price visible before the click.
 */
export default function GiftProductsCTA() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const products = isTr
    ? [
        { icon: <FaRegImage />, name: 'Kanvas Tablo', price: '₺550', unit: "'den başlayan", note: '20x30 cm ₺550’den 50x60 cm ₺1.450’ye kadar, çerçeve gerekmez.', href: '/kanvas-tablo', query: '' },
        { icon: <FaMagnet />, name: 'Fotoğraf Magneti', price: '₺600', unit: " / 10'lu set", note: '6x9 cm, buzdolabı magneti. Düğün ve doğum günü için.', href: '/urunler', query: '?kategori=customizable-products' },
        { icon: <FaMugHot />, name: 'Kişiye Özel Kupa', price: '₺500', unit: ' / adet', note: 'Seramik kupa üzerine baskı, renkleri yıllarca silinmez.', href: '/urunler', query: '?kategori=customizable-products' },
        { icon: <FaPuzzlePiece />, name: 'Fotoğraf Puzzle', price: '₺450', unit: "'den başlayan", note: 'Ahşap destekli parlak baskı. 20x30 ₺450, 30x40 ₺550.', href: '/urunler', query: '?kategori=customizable-products' },
      ]
    : [
        { icon: <FaRegImage />, name: 'Canvas Print', price: '₺550', unit: ' and up', note: 'From 20x30 cm at ₺550 to 50x60 cm at ₺1,450, ready to hang.', href: '/kanvas-tablo', query: '' },
        { icon: <FaMagnet />, name: 'Photo Magnets', price: '₺600', unit: ' / set of 10', note: '6x9 cm fridge magnets. Popular for weddings and birthdays.', href: '/urunler', query: '?kategori=customizable-products' },
        { icon: <FaMugHot />, name: 'Personalised Mug', price: '₺500', unit: ' each', note: 'Printed on ceramic, in colours that do not fade.', href: '/urunler', query: '?kategori=customizable-products' },
        { icon: <FaPuzzlePiece />, name: 'Photo Puzzle', price: '₺450', unit: ' and up', note: 'Gloss print on a wooden backing. 20x30 ₺450, 30x40 ₺550.', href: '/urunler', query: '?kategori=customizable-products' },
      ];

  return (
    <Section id="hediyelik">
      <Container>
        <Grid>
          <TextSide>
            <Badge><FaGift /> {isTr ? 'Hediyelik & Baskı' : 'Gifts & Printing'}</Badge>
            <Title>
              {isTr ? (
                <>Telefonunuzdaki Fotoğraf <span>Duvarda, Kupada, Buzdolabında</span></>
              ) : (
                <>The Photo on Your Phone, <span>on a Wall, a Mug, a Fridge</span></>
              )}
            </Title>
            <Description>
              {isTr ? (
                <>
                  Düğün, doğum günü, yıldönümü ya da sadece güzel bir kare. Fotoğrafınızı WhatsApp’tan
                  gönderin, kanvas tabloya, magnete, kupaya ya da puzzle’a basalım. Türkiye’nin her yerine
                  kargo gönderiyoruz. Sadece kâğıda baskı istiyorsanız{' '}
                  <Link href={getLocalizedHref('/fotograf-baski', language)}>fotoğraf baskı fiyatlarımıza</Link> bakın.
                </>
              ) : (
                <>
                  A wedding, a birthday, an anniversary, or just a good frame. Send us the photo on WhatsApp
                  and we will put it on canvas, a magnet, a mug or a puzzle, and ship anywhere in Turkey.
                  For paper prints only, see our{' '}
                  <Link href={getLocalizedHref('/fotograf-baski', language)}>photo printing prices</Link>.
                </>
              )}
            </Description>
            <CTAs>
              <Button as={Link} href={getLocalizedHref('/kanvas-tablo', language)} $variant="primary" $size="lg">
                {isTr ? 'Kanvas Tablo Sayfası' : 'Canvas Print Page'}
              </Button>
              <Button
                as="a"
                href={getWhatsAppUrl(
                  isTr
                    ? 'Merhaba, fotoğraf baskılı hediye ürünü yaptırmak istiyorum.'
                    : 'Hi, I would like to order a personalised photo gift.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                $variant="whatsapp"
                $size="lg"
              >
                <FaWhatsapp /> {isTr ? 'Fotoğrafı Gönder' : 'Send Your Photo'}
              </Button>
            </CTAs>
          </TextSide>

          <Cards>
            {products.map((p, i) => (
              <ProductCard key={p.name} href={`${getLocalizedHref(p.href, language)}${p.query}`} $delay={`${i * 0.1}s`}>
                <CardIcon>{p.icon}</CardIcon>
                <CardName>{p.name}</CardName>
                <CardPrice>{p.price}<span>{p.unit}</span></CardPrice>
                <CardNote>{p.note}</CardNote>
              </ProductCard>
            ))}
          </Cards>
        </Grid>
      </Container>
    </Section>
  );
}
