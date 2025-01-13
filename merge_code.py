import os

# 出力先のファイルパス
output_file = "merged_output.txt"

def read_and_merge_files(base_dirs, output_file):
    """
    指定されたディレクトリ以下のすべてのファイルを読み取り、
    内容を結合して1つのテキストファイルに書き出します。
    
    Args:
        base_dirs (list): 読み取り対象のディレクトリパスのリスト
        output_file (str): 出力先のファイルパス
    """
    with open(output_file, "w", encoding="utf-8") as out_file:
        for base_dir in base_dirs:
            for root, _, files in os.walk(base_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            # ファイルパスを記載
                            out_file.write(f"--- {os.path.relpath(file_path)} ---\n")
                            # ファイル内容を記載
                            out_file.write(f.read())
                            # 改行を追加
                            out_file.write("\n\n")
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")

# 対象ディレクトリ
base_dirs = ["src/main", "src/preload", "src/renderer"]

# プログラムの実行
read_and_merge_files(base_dirs, output_file)

print(f"All files have been merged into {output_file}")
