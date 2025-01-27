Ruby 3.4 の主要な変更点について詳しく解説します：

1. **`it` の追加**

```ruby
# 従来の書き方
[1, 2, 3].map { |x| x * 2 }
[1, 2, 3].filter { |n| n.even? }
users.select { |user| user.active? }

# Ruby 3.4での新しい書き方
[1, 2, 3].map { it * 2 }
[1, 2, 3].filter { it.even? }
users.select { it.active? }
```

**特徴：**

- 単一の引数を取るブロックでのみ使用可能
- ブロック引数を明示的に書く必要がない
- コードの簡潔性が向上
- 他言語（Kotlin 等）との互換性向上

**制限事項：**

```ruby
# 以下のケースでは使用できない
# 複数の引数を取るブロック
hash.each { |key, value| puts "#{key}: #{value}" }

# ブロック内で引数を複数回使用する場合は従来の書き方推奨
numbers.map { |n| n * n }  # この方が意図が明確
```

2. **デフォルトのパーサを Prism に変更**

- Prism は新しい Ruby パーサー
- C 言語で書かれた高速なパーサー

**メリット：**

- パース速度の向上
- メモリ使用量の削減
- エラーメッセージの改善
- 構文解析の正確性向上

3. **Socket ライブラリの Happy Eyeballs Version 2 対応**

- IPv4 と IPv6 の接続を最適化
- RFC 8305 準拠の実装

**特徴：**

```ruby
# 接続時の動作
socket = TCPSocket.new('example.com', 80)
# - IPv6とIPv4を並行して試行
# - より速い方の接続を採用
# - 接続の遅延を最小化
```

4. **YJIT の更新**

- Ruby 用の Just-In-Time コンパイラ
- パフォーマンスの大幅な改善

**主な改善点：**

```ruby
# YJITの有効化
ruby --yjit example.rb

# 新機能と改善
- コード生成の最適化
- メモリ使用量の削減
- 起動時間の短縮
- コンパイル対象の拡大
```

5. **Modular GC（ガベージコレクション）**

- GC の新しいアーキテクチャ
- より柔軟なメモリ管理

**特徴：**

```ruby
# GCの動作例
class Example
  def initialize
    @data = "large data"
  end
end

objects = []
1000.times { objects << Example.new }
# Modular GCが効率的にメモリを管理
# - 世代別GCの改善
# - メモリフラグメンテーションの削減
# - GC一時停止時間の短縮
```

**メリット：**

- メモリ使用効率の向上
- GC の柔軟性向上
- アプリケーションのパフォーマンス改善

**実践的な使用例：**

```ruby
# itの活用例
# Before
results = data
  .filter { |item| item.valid? }
  .map { |item| item.process }
  .select { |item| item.score > 80 }

# After
results = data
  .filter { it.valid? }
  .map { it.process }
  .select { it.score > 80 }

# YJITとModular GCの恩恵
class DataProcessor
  def process_large_dataset
    dataset = load_large_dataset
    dataset.map { it.transform }
           .filter { it.valid? }
           .each { process_item(it) }
  end
end
# - YJITによる実行速度の向上
# - Modular GCによる効率的なメモリ管理
```

これらの変更により、Ruby 3.4 は：

- コードの可読性向上
- パフォーマンスの改善
- メモリ管理の効率化
- 開発体験の向上

を実現しています。
