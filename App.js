import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const initialNotes = [
  {
    id: 1,
    title: 'Những điều nhỏ bé',
    excerpt: 'Hạnh phúc thường đến từ những điều rất đỗi bình thường...',
    date: 'Hôm nay',
    time: '09:42',
    category: 'Cá nhân',
    color: 'peach',
    pinned: true,
  },
  {
    id: 2,
    title: 'Kế hoạch cuối tuần',
    excerpt: 'Mua hoa, ghé hiệu sách và nấu một bữa tối thật ngon.',
    date: 'Hôm qua',
    time: '18:20',
    category: 'Công việc',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Ý tưởng dự án mới',
    excerpt: 'Một không gian để mọi người cùng chia sẻ những câu chuyện...',
    date: '12 Thg 6',
    time: '14:05',
    category: 'Ý tưởng',
    color: 'lavender',
  },
  {
    id: 4,
    title: 'Danh sách cần đọc',
    excerpt: 'The Creative Act · Steal Like an Artist · Atomic Habits',
    date: '10 Thg 6',
    time: '21:16',
    category: 'Đọc sách',
    color: 'mint',
  },
];

const categories = ['Tất cả', 'Cá nhân', 'Công việc', 'Ý tưởng', 'Đọc sách'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState(initialNotes);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesCategory =
        activeCategory === 'Tất cả' || note.category === activeCategory;
      const matchesQuery = `${note.title} ${note.excerpt}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, notes, query]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Ghi chú mới',
      excerpt: 'Bắt đầu viết điều bạn đang nghĩ...',
      date: 'Vừa xong',
      time: 'Bây giờ',
      category: 'Cá nhân',
      color: 'peach',
    };
    setNotes((current) => [newNote, ...current]);
  };

  const togglePin = (id) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header */}
            <View style={styles.appHeader}>
              <View style={styles.brandMark}>
                <Text style={styles.brandText}>N</Text>
              </View>
              <View style={styles.headerCopy}>
                <Text style={styles.headerTitle}>Xin chào, Người đang nhìn điện thoại</Text>
              </View>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>N</Text>
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>

            {/* Intro Section */}
            <View style={styles.introSection}>
              <View>
                <Text style={styles.sectionKicker}>KHÔNG GIAN CỦA BẠN</Text>
                <Text style={styles.introTitle}>
                  Ghi lại những {'\n'} điều đáng nhớ.
                </Text>
              </View>
              <View style={styles.noteCount}>
                <Text style={styles.countNumber}>{notes.length}</Text>
                <Text style={styles.countLabel}>ghi chú</Text>
              </View>
            </View>

            {/* Search Box */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="Tìm kiếm ghi chú..."
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Featured Note */}
            <View style={styles.featuredNote}>
              <Image
                source={{ uri: 'https://picsum.photos/400/200' }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredOverlay} />
              <View style={styles.featuredContent}>
                <View style={styles.featuredLabel}>
                  <Text style={styles.featuredLabelText}>ĐANG GHIM</Text>
                </View>
                <Text style={styles.featuredTitle}>Những điều nhỏ bé</Text>
                <Text style={styles.featuredExcerpt} numberOfLines={1}>
                  Hạnh phúc thường đến từ những điều rất đỗi bình thường...
                </Text>
                <Text style={styles.featuredDate}>Hôm nay · 09:42</Text>
              </View>
              <TouchableOpacity
                style={styles.featuredAction}
                onPress={() => togglePin(1)}
              >
                <Text style={{ color: '#fff' }}>O</Text>
              </TouchableOpacity>
            </View>

            {/* Category Scroll */}
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>Ghi chú của bạn</Text>
              <Text style={styles.sectionSub}>{filteredNotes.length} mục</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    activeCategory === category && styles.categoryChipActive,
                  ]}
                  onPress={() => setActiveCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      activeCategory === category && styles.categoryChipTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Notes List */}
            <View style={styles.notesList}>
              {filteredNotes.map((note) => (
                <TouchableOpacity
                  key={note.id}
                  style={[styles.noteCard, styles[`card_${note.color}`]]}
                  activeOpacity={0.8}
                >
                  <View style={styles.noteCardTop}>
                    <Text style={styles.noteCategory}>{note.category}</Text>
                    <TouchableOpacity onPress={() => togglePin(note.id)}>
                      <Text style={note.pinned ? styles.pinnedIcon : styles.unpinnedIcon}>
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text style={styles.noteExcerpt} numberOfLines={2}>
                    {note.excerpt}
                  </Text>
                  <View style={styles.noteFooter}>
                    <Text style={styles.noteTime}>{note.date}</Text>
                    <Text style={styles.noteTime}>· {note.time}</Text>
                    <TouchableOpacity style={styles.moreButton}>
                      <Text style={styles.moreText}>•••</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
              {filteredNotes.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>Không tìm thấy ghi chú phù hợp.</Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Floating Action Button */}
          <TouchableOpacity style={styles.addNoteButton} onPress={addNote}>
            <Text style={styles.addNoteText}>+ Ghi chú mới</Text>
          </TouchableOpacity>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navIconActive}>🔖</Text>
              <Text style={styles.navLabelActive}>Ghi chú</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navIcon}>✓</Text>
              <Text style={styles.navLabel}>Hoàn thành</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navIcon}>📌</Text>
              <Text style={styles.navLabel}>Đã ghim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 110, 
  },

  /* Header */
  appHeader: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  brandMark: {
    width: 40,
    height: 40,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCopy: {
    flex: 1,
    marginLeft: 12,
  },
  eyebrow: {
    fontSize: 11,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconText: {
    fontSize: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },

  /* Intro Section */
  introSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionKicker: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 4,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 30,
  },
  noteCount: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  countLabel: {
    fontSize: 11,
    color: '#64748b',
  },

  /* Search Box */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 16,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },

  /* Featured Note */
  featuredNote: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
  },
  featuredContent: {
    zIndex: 1,
  },
  featuredLabel: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  featuredLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  featuredExcerpt: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  featuredDate: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
  },
  featuredAction: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  /* Section Heading & Category */
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  sectionSub: {
    fontSize: 12,
    color: '#64748b',
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },

  /* Notes List */
  notesList: {
    gap: 12,
  },
  noteCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  card_peach: { backgroundColor: '#fff7ed', borderColor: '#ffedd5' },
  card_blue: { backgroundColor: '#f0f9ff', borderColor: '#e0f2fe' },
  card_lavender: { backgroundColor: '#faf5ff', borderColor: '#f3e8ff' },
  card_mint: { backgroundColor: '#f0fdf4', borderColor: '#dcfce7' },

  noteCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  noteCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  pinnedIcon: { opacity: 1 },
  unpinnedIcon: { opacity: 0.3 },

  noteTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  noteExcerpt: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  noteFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  noteTime: {
    fontSize: 11,
    color: '#94a3b8',
    marginRight: 4,
  },
  moreButton: {
    marginLeft: 'auto',
  },
  moreText: {
    color: '#64748b',
    fontWeight: 'bold',
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
  },

  /* FAB Button */
  addNoteButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addNoteText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* Bottom Navigation */
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: { fontSize: 16, opacity: 0.4 },
  navIconActive: { fontSize: 16 },
  navLabel: { fontSize: 10, color: '#94a3b8', marginTop: 2 },
  navLabelActive: { fontSize: 10, color: '#6366f1', fontWeight: 'bold', marginTop: 2 },
});